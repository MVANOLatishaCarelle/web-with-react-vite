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
        <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto space-y-5">
            <input
            type="text"
            placeholder="Nom"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            <textarea
            type="text"
            placeholder="Description"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <input
            type="number"
            placeholder="Prix"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            <input
            type="file"
            placeholder="Photo du plat"
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer"
            required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
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