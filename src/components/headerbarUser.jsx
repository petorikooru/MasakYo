import { NavLink } from "react-router-dom";
import Button1 from "./button1";
import Button3 from "./button3";
import ButtonName from "./ButtonName.jsx";
import ButtonRegular from "./ButtonRegular.jsx";

export default function HeaderBarUser() {
return (
    <nav className="
            w-auto py-3 px-3 mx-10 rounded-[40px]
            bg-gradient-to-r from-[#FFD6D6] to-[#DE9393] 
            flex justify-between items-center shadow-lg
    ">

        <h1 className="pl-5 text-[36px] font-bold text-[#521F1F]">MasakYo</h1>

            <div className="flex items-center space-x-6 text-[#521F1F] font-medium">

            <NavLink to="/user/discover">
                <ButtonRegular nama="Discover" />
            </NavLink>
                    
            <NavLink to="/user/katalog">
                <ButtonRegular nama="Katalog" />
            </NavLink>
        </div>

        <NavLink to="/user/settings">
            <ButtonName nama="User" />
        </NavLink>

    </nav>
  );
}
