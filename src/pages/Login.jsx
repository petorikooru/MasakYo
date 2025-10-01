import { useState } from "react";
import { NavLink } from "react-router-dom";
import Buttonwide from "../components/buttonwide";
import Button2 from "../components/button2";
import Signup from "../components/login_signup";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen">

      <div
        className="w-1/2 relative flex flex-col justify-between p-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/cake.jpg')" }}
      >

        <div className="absolute top-4 left-4">
          <Button2 nama="← Go back" />
        </div>

        <div className="mt-40 text-white px-8">
          <h1 className="text-[70px] font-extrabold bg-gradient-to-r from-[#B43739] to-[#FFAFAF] text-transparent bg-clip-text">
            MasakYo
          </h1>
          <p className="text-lg mt-2">Temukan kuliner dunia</p>
        </div>

        <div className="flex gap-2 mb-4 px-2">
          <Signup/>    
        </div>
      </div>

      <div className="w-1/2 bg-[#FFE0E0] flex items-center justify-center">
        <div className="bg-[#FFE0E0] p-10 rounded-lg shadow-lg w-96">

          <div className="flex justify-center gap-4 mb-6">
            <img src="/pria.jpg" alt="User1" className="w-14 h-14 rounded-full" />
            <img src="/wanita.png" alt="User2" className="w-14 h-14 rounded-full" />
          </div>

          <h2 className="text-center text-[25px] mb-6 text-black font-bold">Login</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-black ">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAFAF]"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1 font-medium text-black">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAFAF]"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-pink-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <NavLink to="/user/discover">
            <Buttonwide nama="Login!" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
