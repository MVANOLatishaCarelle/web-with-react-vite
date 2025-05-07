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
        <h1 className="text-3xl font-bold mb-4">Gestion des Plats</h1>
        <form className="space-y-4 mb-6">
            <input
            type="text"
            placeholder="Nom"
            className="border px-4 py-2 rounded w-full"
            required
            />
            <input
            type="text"
            placeholder="Description"
            className="border px-4 py-2 rounded w-full"
            />
            <input
            type="number"
            placeholder="Prix"
            className="border px-4 py-2 rounded w-full"
            required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditing ? "Modifier" : "Créer"}
            </button>
      </form>

      <ul className="space-y-4">
          <li className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">nom</h2>
              <p>description</p>
              <p className="text-green-600 font-semibold">prix €</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Modifier
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
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