import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import LoginPage from "./pages/User"; 
import MenuUser from "./pages/menuUser";
import Katalog from "./pages/Katalog";
import Discover from "./pages/Discover";
import Anggun from "./pages/Anggun";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/User" element={<LoginPage />} /> 
        <Route path="/menuUser" element={<MenuUser />} />
        <Route path="/Discover" element={<Discover/>} />
        <Route path="/Katalog" element={<Katalog/>} />
        <Route path="/Anggun" element={<Anggun/>} />
      </Routes>
    </Router>
  );
}
