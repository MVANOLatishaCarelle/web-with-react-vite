import { Link } from "react-router-dom";
import FoodImage from "../Photos/food.jpg";


function Menu(){
    return(
      <nav
        className="fixed top-0 right-0 w-50 bg-cover bg-center m-4 flex flex-col items-center justify-center m-4 border-4 border-black rounded-lg"
        style={{
                backgroundImage: `url(${FoodImage})`,
              }}
      >
        <ul className="flex space-x-8 bg-black/50 p-4 rounded-lg">
          <li>
            <Link to="/vendeur" className="text-white text-xl font-extrabold hover:underline">Accueil </Link>
          </li>
          <li>
            <Link to="/commande" className="text-white text-xl font-extrabold hover:underline">Commandes</Link>
          </li>
          <li>
            <Link to="/plat" className="text-white text-xl font-extrabold hover:underline">Menu</Link>
          </li>
          <li>
            <Link to="/plat" className="text-white text-xl font-extrabold hover:underline">Profil</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Menu;