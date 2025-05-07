import Notifications from "./notif";
import Menu from "./menu";
import { useState } from "react";

function PlatPage(){
    const [isEditing] = useState(false);
    return (
        <div className="min-h-screen flex">
            <Notifications/>
            <div className="flex flex-col w-[75%] bg-gray-200 p-6">
                <Menu/>
                <div className="mt-20"></div>
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ textShadow:'2px 4px 2px sand'}}>Administration Des Plats</h1>
        <form
            className="p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto space-y-4"
            style={{ backgroundColor: 'rgba(194, 178, 128, 0.8)' }}
            >
            <input
                type="text"
                placeholder="Nom du plat"
                className="w-full border bg-gray-200 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
                required
            />

            <input
                placeholder="Description"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white resize-none"
            />

            <input
                type="number"
                placeholder="Prix"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
                required
            />

            <input
                type="file"
                className="w-full border border-black px-3 py-2 rounded bg-white file:bg-black file:text-white file:px-4 file:py-1 file:rounded file:border-0 file:cursor-pointer"
                required
            />

            <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded transition"
            >
            {isEditing ? "Modifier" : "Créer"}
            </button>
      </form>

      <ul className="space-y-4 mt-8">
        <li className="border rounded-lg overflow-hidden shadow flex items-center bg-white">
            {/* Image du plat */}
            <img
            src="URL_DE_L_IMAGE_DU_PLAT"
            alt="Plat"
            className="w-32 h-32 object-cover"
            />

            {/* Détails du plat */}
            <div className="flex-1 px-4 py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Nom du plat</h2>
            <p className="text-gray-600 mb-1">Description détaillée du plat ici.</p>
            <p className="text-green-700 font-semibold">Prix : 12.99 €</p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col space-y-2 px-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                Modifier
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                Supprimer
            </button>
            </div>
        </li>
        </ul>

    </div>
    </div>
    </div>
  );
}

export default PlatPage;