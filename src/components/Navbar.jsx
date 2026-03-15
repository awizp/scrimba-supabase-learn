import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {

    const { theme, handleTheme } = useContext(ThemeContext);

    return (
        <nav className="w-full py-5">
            <div className="container-card flex justify-between items-center">
                <h1 className="text-xl font-bold italic">Supabase <span className="text-green-600">Learn</span></h1>

                <button onClick={handleTheme}
                    className="border-2 border-black/60 p-1 rounded-lg cursor-pointer"
                >
                    <div
                        className={`${theme === 'light' ? 'hidden' : 'flex'} justify-center items-center`}
                    ><ion-icon name="sunny"></ion-icon></div>
                    <div
                        className={`${theme === 'dark' ? 'hidden' : 'flex'} justify-center items-center`}
                    ><ion-icon name="moon"></ion-icon></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;