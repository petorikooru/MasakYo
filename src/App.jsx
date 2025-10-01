import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing          from "./pages/Landing";
import About            from "./pages/About";
import Login            from "./pages/Login"; 
import UserKatalog      from "./pages/user/Katalog";
import UserDiscover     from "./pages/user/Discover";
import UserSettings     from "./pages/user/Settings";
import UserRecipe       from "./pages/user/Recipe";

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
      </Routes>
    </Router>
  );
}
