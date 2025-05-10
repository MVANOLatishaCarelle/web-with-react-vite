import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendeurAPI } from "../services/vendeurAPI";

function AuthForm(){
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [horaire, setHoraire] = useState("");
    const [photo, setPhoto] = useState(null);

    const [message, setMessage] = useState(null);
    const [erreur, setErreur] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const vendeur = {nom, email, password, phone, adresse, horaire,};

        try {
            const result = await vendeurAPI.createVendeur(vendeur, photo);
            setMessage(`Compte créé avec succès ! ${result.nom}`);
            setErreur(false);
            navigate("/home");
        } catch (error) {
            setMessage(`Message : ${error.message}`);
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
                    value={nom} onChange={(e)=> setNom(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    value={email} onChange={(e)=> setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    value={password} onChange={(e)=> setPassword(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Telephone"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    value={phone} onChange={(e)=> setPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresse"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    value={adresse} onChange={(e)=> setAdresse(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Horaire d'ouverture"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    value={horaire} onChange={(e)=> setHoraire(e.target.value)}
                />
                <input
                    type="file"
                    placeholder="Nom"
                    className="border rounded-lg px-4 py-2 focus:outline-none w-full"
                    onChange={(e)=> setPhoto(e.target.files[0])}
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 hover:text-white transition w-full"
                >
                Connexion
                </button>
                {/* <Link to="/" className="text-sm text-sand p-20 hover:underline">Tu as déjà un compte?</Link> */}
            </form>
            <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-sand hover:underline">
                    Tu as déjà un compte?
                </Link>
            </div>
            </div>
            </div>
    );
}

export default AuthForm;