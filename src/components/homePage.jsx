import Menu from "./menu";
import Notifications from "./notif";

function HomePage() {
    return (
        <div className="min-h-screen flex">
            <Notifications/>
            <div className="flex flex-col w-[75%] bg-gray-200 p-6">
                <Menu/>
                <div className="mt-20">
                    <div className="mb-6">Notifications de nouvelles commandes</div>
                    <div>Notifications du feedback</div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
