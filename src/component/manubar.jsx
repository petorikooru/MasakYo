import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Editrecipe from "./Editrecipe";

const Menubar = ({ title, category, description, image, isAdmin, onDelete }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center rounded-2xl bg-black/70 backdrop-blur-md text-white p-5 shadow-lg mb-6">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-red-400 font-semibold">{category}</p>
          <p className="mt-2 text-sm text-gray-200">{description}</p>
          <div className="mt-3 text-sm">
            <span className="mr-4">Kesulitan : ★★★☆☆</span>
            <span>Kelezatan : ★★★★☆</span>
          </div>

          {isAdmin && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowEdit(true)}
                className="p-2 bg-pink-600 hover:bg-pink-700 rounded-full cursor-pointer"
              >
                <FaEdit />
              </button>
              <button onClick={() => onDelete(title)} className="p-2 bg-red-600 hover:bg-red-700 rounded-full cursor-pointer">
                <FaTrash />
              </button>
            </div>
          )}
        </div>
        <img
          src={image}
          alt={title}
          className="rounded-xl ml-6 w-40 h-28 object-cover"
        />
      </div>

      {showEdit && <Editrecipe onClose={() => setShowEdit(false)} />}
    </>
  );
};

export default Menubar;