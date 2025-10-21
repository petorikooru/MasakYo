import ButtonRegular from "./ButtonRegular";
import { useState } from "react";

interface ButtonLoginProps {
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
}

export default function ButtonLogin({ onSignUpClick, onLoginClick }: ButtonLoginProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleSignUp = () => {
    setActiveTab("signup");
    onSignUpClick?.();
  };

  const handleLogin = () => {
    setActiveTab("login");
    onLoginClick?.();
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-red-400/10 to-red-600/10 p-2 border border-red-400/20 backdrop-blur-sm flex gap-2">
      <ButtonRegular 
        nama="Sign Up" 
        onClick={handleSignUp}
        className={`px-8 py-3 border border-red-400/30 transition-all rounded-xl ${
          activeTab === "signup" 
            ? "bg-gradient-to-r from-red-500 to-red-600 text-white" 
            : "bg-red-500/20 text-red-200 hover:bg-red-500/30"
        }`}
      />
      <ButtonRegular 
        nama="Login" 
        onClick={handleLogin}
        className={`px-8 py-3 border border-red-400/30 transition-all rounded-xl ${
          activeTab === "login" 
            ? "bg-gradient-to-r from-red-500 to-red-600 text-white" 
            : "bg-red-500/20 text-red-200 hover:bg-red-500/30"
        }`}
      />
    </div>
  );
}