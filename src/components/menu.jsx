import FoodImage from "../Photos/food.jpg";


function Menu(){
    return(
        <nav
      className="fixed top-0 right-0 w-50 bg-cover bg-center m-4 flex flex-col items-center justify-center"
      style={{
                  backgroundImage: `url(${FoodImage})`,
                }}
    >
      <ul className="flex space-x-8 bg-black/50 p-4 rounded-lg">
        <li>
          <a href="/vendeur" className="text-white text-xl font-extrabold hover:underline">
            Info du vendeur
          </a>
        </li>
        <li>
          <a href="/commandes" className="text-white text-xl font-extrabold hover:underline">
            Commandes
          </a>
        </li>
        <li>
          <a href="/plats" className="text-white text-xl font-extrabold hover:underline">
            Plats
          </a>
        </li>
      </ul>
    </nav>
    );
}

export default Menu;