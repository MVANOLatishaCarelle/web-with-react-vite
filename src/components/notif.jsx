import { Link } from "react-router-dom";
import FoodImage from "../Photos/food.jpg";

function Notifications(){
    const commandes = [
        {id:1, nom:"latisha", plat:"salade au carroni"},
        {id:2, nom:"miru", plat:"soupe aux epinards"},
    ];
    return(
        <div className="w-[25%] flex flex-col items-center max-w-md mx-auto p-2 bg-cover bg-center bg-no-repeat" 
        style={{
            backgroundImage: `url(${FoodImage})`,
          }} >

            <h1 className="text-4xl text-white font-extrabold rounded-2xl" style={{ textShadow: '2px 2px 8px red'}}>
                Goûts du Coin
            </h1>
            <div className="my-8 w-full min-h-[300px] bg-sand rounded-md shadow-inner flex items-center justify-center">                
                {commandes.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                        {commandes.map((commande) => (
                            <li key={commande.id}>
                                <Link to={"/commande/${commande.id}"} className="text-black font-semibold hover:underline">
                                {commande.nom} - {commande.plat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ):(
                    <div className="flex items-center justify-center h-full">
                        <span className="text-black italic">Aucune commande pour l'instant</span>
                    </div>
                )}
            </div>
            <div className="my-8 w-full min-h-[150px] bg-sand rounded-md shadow-inner flex items-center justify-center">
                <span className="text-black italic">Aucun commentaire pour l'instant</span>
            </div>
        </div>
    );
}

export default Notifications;