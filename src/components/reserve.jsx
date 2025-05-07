import { useEffect, useState } from "react";
import Notifications from "./notif";
import Menu from "./menu";
import { platAPI } from "../services/platAPI"; // Assurez-vous que ce fichier existe

function PlatPage() {
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

  useEffect(() => {
    fetchPlats();
  }, []);

  const fetchPlats = async () => {
    const data = await platAPI.getAll();
    setPlats(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("plat", JSON.stringify({
      nom: formData.nom,
      description: formData.description,
      prix: formData.prix,
      disponible: formData.disponible
    }));
    form.append("photo", formData.photo);

    if (isEditing) {
      await platAPI.update(editPlatId, form);
    } else {
      await platAPI.create(form);
    }

    setShowForm(false);
    setFormData({ nom: "", description: "", prix: "", photo: null, disponible: true });
    setIsEditing(false);
    fetchPlats();
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
    await platAPI.delete(id);
    fetchPlats();
  };

  return (
    <div className="min-h-screen flex">
      <Notifications />
      <div className="flex flex-col w-[75%] bg-gray-200 p-6">
        <Menu />
        <div className="mt-20"></div>

        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6" style={{ textShadow: '2px 4px 2px sand' }}>
            Administration Des Plats
          </h1>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 mb-6 rounded"
            >
              Ajouter un plat
            </button>
          )}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-lg shadow-lg bg-white space-y-4 mb-6"
            >
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom du plat"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="Prix"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
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
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Modifier" : "Créer"}
                </button>
                <button
                  type="button"
                  className="text-gray-600 underline"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setFormData({ nom: "", description: "", prix: "", photo: null, disponible: true });
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}

          <ul className="space-y-4">
            {plats.map((plat) => (
              <li key={plat.id} className="border rounded-lg shadow flex items-center bg-white overflow-hidden">
                <img
                  src={plat.photoUrl}
                  alt={plat.nom}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 px-4 py-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{plat.nom}</h2>
                  <p className="text-gray-600 mb-1">{plat.description}</p>
                  <p className="text-green-700 font-semibold">Prix : {plat.prix} €</p>
                  {!plat.disponible && <p className="text-red-600">Indisponible</p>}
                </div>
                <div className="flex flex-col space-y-2 px-4">
                  <button
                    onClick={() => handleEdit(plat)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(plat.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlatPage;
