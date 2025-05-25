import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodImage from "../Photos/food.jpg";
import { commandeAPI } from '../services/commandeAPI';

function Notifications() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const orderData = await commandeAPI.getAllCommandesSaufLivre();
                setOrders(orderData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    }, []);

    return (
        <div className="w-[25%] flex flex-col items-center max-w-md mx-auto p-2 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${FoodImage})` }}>
            
            <h1 className="text-4xl text-white font-extrabold rounded-2xl" style={{ textShadow: '2px 2px 8px red' }}>
                Goûts du Coin
            </h1>

            <div className="my-8 w-full min-h-[300px] bg-sand rounded-md shadow-inner flex items-center justify-center">                
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-black italic">Chargement en cours...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-red-600">{error}</span>
                    </div>
                ) : orders.length > 0 ? (
                    <ul className="flex flex-col gap-4 w-full p-4">
                        {orders.map((order) => (
                            
                            <li key={order.id} className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow">
                                <Link to={`/commande/${order.id}`} className="block text-black hover:text-blue-600">
                                    <div className="font-bold">Commande # {order.id}</div>
                                    <div className="text-sm text-gray-600">
                                        Statut: {order.statut?.replace('_', ' ')}
                                    </div>
                                    <div className="mt-2">
                                        {order.articles?.map((article, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span>{article.nom} × {article.quantite}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-2 font-semibold border-t pt-2 flex justify-between">
                                        <span>Total:</span>
                                        <span>{order.prixTotal?.toFixed(2)}€</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-black italic">Aucune commande pour l'instant</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notifications;