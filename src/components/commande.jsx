import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { commandeAPI } from '../services/commandeAPI';

const CommandeDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Status options for dropdown
  const statusOptions = [
    { value: 'En_attente', label: 'En attente' },
    { value: 'En_livraison', label: 'En livraison' },
    { value: 'Annule', label: 'Annulé' }
  ];

  // Fetch order details
  useEffect(() => {
    const loadOrder = async () => {
      try {
        console.log("Fetching order with ID:", orderId);
        if (!orderId || isNaN(orderId)) {
          throw new Error("ID de commande invalide");
        }

        const orderData = await commandeAPI.getCommandeById(Number(orderId));
        console.log("API Response Data:", orderData);
        if (!orderData) {
          throw new Error("Commande non trouvée");
        }
        setOrder(orderData);
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
        // Redirect to orders list after 3 seconds if error
        setTimeout(() => navigate('/home'), 3000);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, navigate]);

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    try {
      const updatedOrder = await commandeAPI.updateCommandeStatus(
        Number(orderId), 
        { statut: newStatus }
      );
      setOrder(prev => ({ ...prev, statut: updatedOrder.statut }));
      showNotification('Statut mis à jour avec succès!', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8">
      <div className="bg-red-100 text-red-700 p-4 rounded-md max-w-md mx-auto">
        {error}
        <p className="mt-2">Redirection en cours...</p>
      </div>
    </div>
  );

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux commandes
      </button>

      {/* Order header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold">Commande #{order.id}</h1>
          {/* <p className="text-gray-500">
            {new Date(order.dateCommande).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p> */}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.statut === 'Livre' ? 'bg-green-100 text-green-800' :
            order.statut === 'Annule' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {order.statut.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Order summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Client</h3>
          <p className="text-gray-900">{order.client?.email || 'Non spécifié'}</p>
          {order.client?.email && (
            <p className="text-gray-600 text-sm">{order.client.email}</p>
          )}
        </div>

        {/* <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Livraison</h3>
          <p className="text-gray-900">{order.adresseLivraison || 'À récupérer sur place'}</p>
        </div> */}

        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Total</h3>
          <p className="text-2xl font-bold text-gray-900">
            {order.prixTotal?.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-8 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Articles</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {order.articles?.map((article, index) => (
            <div key={index} className="p-4 flex justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                  {article.plat?.image ? (
                    <img 
                      src={article.plat.image} 
                      alt={article.plat.nom} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Pas d'image</span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{article.plat?.nom || 'Article sans nom'}</h3>
                  <p className="text-sm text-gray-500">ID: {article.plat?.id || 'N/A'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{(article.prix * article.quantite).toFixed(2)}€</p>
                <p className="text-sm text-gray-500">{article.quantite} × {article.prix.toFixed(2)}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status update */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Mettre à jour le statut</h2>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusUpdate(option.value)}
              disabled={order.statut === option.value}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                order.statut === option.value
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comments section */}
      {/* {order.commentaire && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Commentaire du client</h3>
          <p className="text-yellow-700">{order.commentaire}</p>
        </div>
      )} */}
    </div>
  );
};

export default CommandeDetail;