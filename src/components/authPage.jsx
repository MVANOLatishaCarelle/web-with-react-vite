import plats from "../Photos/plats.jpg";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AuthPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault(); // empêcher le rechargement de la page

        if(email == "test@gmail.com" && password == "test"){
            navigate("/home");
        }else{
            alert("Utilisateur ou Mot de passe incorrect");
        }
    };

    return(
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-sand flex flex-col justify-center items-center p-8">
                <img src={plats} alt="Delicious Dishes" className="rounded-lg mb-6"/>
                <div className="text-center">
                    <p className="text-2xl font-semibold mb-2 font-copperplate text-shadow-lg text-shadow-large">
                        Nos délicieux plats vous attendent ! <br />Livraison rapide et chaleureuse à votre porte.
                    </p>
                        {/* “Savourez de délicieux plats livrés à votre porte.” */}
                    {/* <p className="text-sm text-gray-600">Karen Yue</p>
                    <p className="text-xs text-gray-500">Director of Digital Marketing Technology</p> */}
                </div>
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center text-sand-800">
                        Bienvenue sur <span className="text-sand"> Goûts du Coin</span>
                    </h1>
                    {/* <p className="text-sm text-gray-600 mb-6"> Nous sommes heureux de vous revoir. </p> */}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sand"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sand"
                        />
                        <button
                            type="submit"
                            className="w-full bg-sand text-white py-2 rounded-lg hover:bg-black transition"
                        >
                        Connexion
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Besoin d'un compte?{" "}
                        <Link to="/auth" className="text-red-500 hover:underline">S'inscrire</Link>
                    </p>
                    </div>
            </div>
        </div>
    );
}

export default AuthPage;