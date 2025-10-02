import Headerbar from "../components/headerbar";
import About from "./About";

export default function Landing() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('../assets/images/home_1.jpg')" }}>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="fixed top-0 left-0 w-full z-50">
        <Headerbar />
      </div>

      <div className="absolute top-1/3 left-10 text-white">
        <h2 className="text-[25px] font-semibold">
          Selamat datang di
          <span className="block text-[100px] font-extrabold bg-gradient-to-r from-[#B43739] to-[#FFAFAF] text-transparent bg-clip-text">MasakYo</span>
        </h2>
        <p className="mt-2 text-[25px]">Temukan kuliner dunia</p>
      </div>

      <div className="relative w-full h-full">
        {/* Polaroid Landscape Daging */}
        <div className="absolute top-40 right-70 transform -rotate-8 shadow-xl z-10">
          <img
            src="/daging.jpg"
            alt="Daging"
            className="w-70 h-45 object-cover rounded-lg border-5 border-white"
          />
        </div>

        {/* Polaroid Portrait Telur*/}
        <div className="absolute top-50 right-50 transform rotate-22 shadow-xl z-20">
          <img
            src="/telur.jpg"
            alt="Telur"
            className="w-40 h-60 object-cover rounded-lg border-5 border-white"
          />
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center z-10">
        <p className="text-white text-lg">Learn More</p>
        <span className="block text-white animate-bounce">⌄</span>
      </div>

      <About />
    </div>
  );
}
