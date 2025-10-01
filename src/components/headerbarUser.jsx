import { NavLink } from "react-router-dom";
import Button1 from "./button1";
import Button3 from "./button3";

export default function HeaderBarUser() {
return (
    <nav className="w-auto mx-10 my-5 rounded-3xl bg-gradient-to-r from-[#FFD6D6] to-[#DE9393] py-2 px-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-[#521F1F]">MasakYo</h1>
           <div className="flex items-center space-x-6 text-[#521F1F] font-medium">
        <NavLink to="/Discover">
            <Button1 nama="Discover" />
        </NavLink>
        <NavLink to="/Katalog">
            <Button1 nama="Katalog" />
        </NavLink>
        <NavLink to="/Anggun">
            <Button3 nama="Anggun" />
        </NavLink>
      </div>
    </nav>
  );
}