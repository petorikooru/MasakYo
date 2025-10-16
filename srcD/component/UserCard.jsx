import { FaTrash } from "react-icons/fa";

const UserCard = ({ name, email, registered, avatar, onDelete }) => {
  return (
    <div className="flex justify-between items-center rounded-full bg-black/70 backdrop-blur-md text-white p-5 shadow-lg mb-4 border border-white/10 ">
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-white/30"
        />
        <div>
          <h2 className="text-xl font-bold text-red-400">{name}</h2>
          <p className="text-gray-300 text-sm">{email}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-300">Registered in</p>
        <p className="text-lg font-semibold text-pink-400">{registered}</p>
      </div>

      <button
        onClick={() => onDelete(name)} 
        className="ml-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default UserCard;