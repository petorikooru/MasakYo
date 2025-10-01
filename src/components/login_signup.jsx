import Button1 from "./button1";

export default function Signup() {
  return (
    <div className="w-160px h-20px rounded-4xl bg-gradient-to-b from-[#FFD6D6] to-[#DE9393] p-4 flex justify-center gap-4 shadow-md">
      <Button1 nama="Sign Up" className="w-40 rounded-full px-6 py-2 bg-[#DE9393] text-white"/>
      <Button1 nama="Login" className="w-40 rounded-full px-6 py-2 bg-[#DE9393] text-white"/>
    </div>
  );
}