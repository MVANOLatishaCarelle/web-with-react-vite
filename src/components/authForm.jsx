import { Link } from "react-router-dom";
import { useState } from "react";
import { vendeurAPI } from "../services/vendeurAPI";
import { use } from "react";


function AuthForm(){
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [horaire, setHoraire] = useState("");
    const [photo, setPhoto] = useState(null);

    const [message, setMessage] = useState(null);
    const [erreur, setErreur] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const vendeur = {nom, email, password, telephone, adresse, horaireOuverture: horaire,};

        try {
            const result = await vendeurAPI.createVendeur(vendeur, photo);
            setMessage("Compte créé avec succès !")
            setErreur(false);
        } catch (error) {
            setMessage("Erreur lors de la création du compte.");
            setErreur(true);
        }
    }

    return (
        <div className="min-h-screen bg-sand flex justify-center items-center">
            <div className="bg-white p-10 border rounded-lg grid place-items-center max-w-md mx-auto mt-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {message && (
                <div className={`text-center font-medium ${erreur ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </div>)}
                <input
                    type="text"
                    placeholder="Nom du Restaurant"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="phone"
                    placeholder="Telephone"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="Adresse"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="text"
                    placeholder="Horaire d'ouverture"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <input
                    type="file"
                    placeholder="Nom"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:text-white transition w-full"
                >
                Connexion
                </button>
                <Link to="/" className="text-sm text-sand p-20 hover:underline">Tu as déjà un compte?</Link>
            </form>
            </div>
            </div>
    );
}

export default AuthForm;