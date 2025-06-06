import Notifications from "./notif";
import Menu from "./menu";
import { useEffect, useState } from "react";
import {platAPI} from "../services/platAPI";

function PlatPage(){
    const [plats, setPlats] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        description: "",
        prix: "",
        photo: null,
        disponible: true
    });
    const [editPlatId, setEditPlatId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=> {
        fetchPlats();
    }, []);
    const fetchPlats = async () => {
        const data = await platAPI.getPlat();
        setPlats(data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files} = e.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: type === "checkbox" ? checked : files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const platJson = {
            nom: formData.nom,
            description: formData.description,
            prix: formData.prix,
            disponible: formData.disponible
        };

        const photoFile = formData.photo;

        try {
            if(isEditing){
            await platAPI.updatePlat(editPlatId, platJson, photoFile);
        }else{
            await platAPI.createPlat(platJson, photoFile);
        }
        setShowForm(false);
        setFormData({nom: "", description: "", prix: "", photo: null, disponible: true});
        setIsEditing(false);
        fetchPlats();
        } catch (error) {
            alert("Une erreur est survenue lors de l’envoi.", error);
        }
        
    };

    const handleEdit = (plat) => {
        setFormData({
            nom: plat.nom,
            description: plat.description,
            prix: plat.prix,
            disponible: plat.disponible,
            photo: null
        });
        setEditPlatId(plat.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?");
        if(!confirmDelete) return;
        try {
            await platAPI.deletePlat(id);
        fetchPlats();
        } catch (error) {
            alert("Erreur lors de la suppression.", error);
        }
        
    }

    const handleSearch = async () =>{
        try {
            if(searchTerm.trim() === ""){
                fetchPlats();
            }else{
                const data = await platAPI.getPlayByMotCle(searchTerm);
                setPlats(data);
            }
        } catch (error) {
            alert("Erreur lors de la recherche du plat.", error);
        }
    }
    return (
        <div className="min-h-screen flex">
            <Notifications/>
            <div className="flex flex-col w-[75%] bg-gray-200 p-6">
                <Menu/>
                <div className="mt-20"></div>
        {/* <div className="p-6 max-w-3xl mx-auto"> */}
        <h1 className="text-3xl font-bold mb-4" style={{ textShadow:'2px 4px 2px sand'}}>Administration Des Plats</h1>
        
        {!showForm && (
            <button
                onClick={()=> setShowForm(true)}
                className="w-fit bg-sand text-white px-4 py-2 mb-6 rounded"
            >
                Ajouter Un Plat
            </button>
        )}
        {showForm && (
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto space-y-4"
                style={{ backgroundColor: 'rgba(194, 178, 128, 0.8)' }}
            >
                <input
                    type="text"
                    placeholder="Nom du plat"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border bg-gray-200 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white resize-none"
                    required
                />

                <input
                    type="number"
                    placeholder="Prix"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
                    required
                />

                <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="w-full border border-black px-3 py-2 rounded bg-white file:bg-black file:text-white file:px-4 file:py-1 file:rounded file:border-0 file:cursor-pointer"
                    required={!isEditing}
                />
                <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="disponible"
                  checked={formData.disponible}
                  onChange={handleChange}
                />
                <span>Disponible</span>
                </label>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded transition"
                >
                {isEditing ? "Modifier" : "Créer"}
                </button>
                <button
                    type="button"
                    className="text-gray-600 underline"
                    onClick={()=> {
                        setShowForm(false);
                        setIsEditing(false);
                        setFormData({ nom: "", description: "", prix: "", photo: null, disponible: true });
                    }}
                >
                    Annuler
                </button>
            </form>
        )}
        
        <div className="mb-6 flex items-center gap-4 w-fit ml-auto">
            <input
                type="text"
                placeholder="Recherche un plat"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
            >
                Recherche
            </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(plats) && plats.map((plat) => (
              <li key={plat.id} className="border rounded-lg shadow flex items-center bg-white overflow-hidden">
                <img
                  src={plat.photo}
                  alt={plat.nom}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 px-4 py-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{plat.nom}</h2>
                  <p className="text-gray-600 mb-1">{plat.description}</p>
                  <p className="text-green-700 font-semibold">Prix : {plat.prix} FBu</p>
                  {!plat.disponible && <p className="text-red-600">Indisponible</p>}
                </div>
                <div className="flex flex-col space-y-2 px-4">
                  <button
                    onClick={() => handleEdit(plat)}
                    className="bg-stone-600 hover:bg-stone-900 text-white px-2 py-1 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(plat.id)}
                    className="bg-red-800 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    // </div>
  );
}

export default PlatPage;
