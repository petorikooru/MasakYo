import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing          from "./pages/Landing";
import About            from "./pages/About";
import Login            from "./pages/Login"; 
import UserKatalog      from "./pages/user/Katalog";
import UserDiscover     from "./pages/user/Discover";
import UserSettings     from "./pages/user/Settings";
import UserRecipe       from "./pages/user/Recipe";
import Home             from "../srcD/assets/adminhome";
import Resep             from "../srcD/assets/adminresep";
import AdminUser             from "../srcD/assets/adminuser";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/user/discover" element={<UserDiscover/>} />
        <Route path="/user/katalog" element={<UserKatalog/>} />
        <Route path="/user/settings" element={<UserSettings/>} />
        <Route path="/user/recipe/:id" element={<UserRecipe/>} />
        <Route path="/admin/home" element={<Home/>} />
        <Route path="/admin/resep" element={<Resep/>} />
        <Route path="/admin/user" element={<AdminUser/>} />
      </Routes>
    </Router>
  );
}
