import { useParams, Link } from "react-router-dom";

// Même tableau importé ici (à centraliser plus tard dans un fichier séparé)
const commandes = [
  { id: "1", client: "Jean Dupont", total: "28€", plats: ["Pizza", "Salade"] },
  { id: "2", client: "Marie Curie", total: "12€", plats: ["Burger", "Frites"] }
];

function CommandeDetail() {
  const { id } = useParams();
  const commande = commandes.find(c => c.id === id);

  if (!commande) {
    return <div className="p-6 text-red-600">Commande introuvable.</div>;
  }

  return (
    <div className="min-h-screen bg-sand flex justify-center items-center">
      <div className="bg-white p-8 border rounded-lg max-w-md mx-auto mt-10 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Détail de la commande #{commande.id}</h2>
        <p><strong>Client :</strong> {commande.client}</p>
        <p><strong>Total :</strong> {commande.total}</p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Plats commandés :</h3>
          <ul className="list-disc list-inside text-gray-700">
            {commande.plats.map((plat, index) => (
              <li key={index}>{plat}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Accepter
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Refuser
          </button>
        </div>

        <Link to="/commandes" className="block text-sm text-blue-600 mt-6 hover:underline">
          ← Retour à la liste
        </Link>
      </div>
    </div>
  );
}

export default CommandeDetail;
