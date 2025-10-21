import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLanding     from "@pages/MainLanding";
import MainLogin       from "@/pages/MainLogin"; 
import UserKatalog     from "@pages/user/UserKatalog";
import UserDiscover    from "@pages/user/UserDiscover";
import UserRecipe      from "@pages/user/UserRecipe";
// import Home             from "../srcD/assets/adminhome";
// import Resep            from "../srcD/assets/adminresep";
// import AdminUser        from "../srcD/assets/adminuser";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} /> 
        <Route path="/login" element={<MainLogin />} /> 
        <Route path="/user/" element={<UserDiscover />} /> 
        <Route path="/user/katalog" element={<UserKatalog />} /> 
        <Route path="/user/discover" element={<UserDiscover />} /> 
        <Route path="/user/recipe/:id" element={<UserRecipe/>} />
      </Routes>
    </Router>
  );
}