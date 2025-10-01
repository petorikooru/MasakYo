import { useState } from "react";
import { User } from "lucide-react";
import PopupModal from "./PopupModal";

export default function ChangeUsernamePopup({ isOpen, onClose }) {
  const [currentUsername, setCurrentUsername] = useState("Alice Liddel");
  const [newUsername, setNewUsername] = useState("");

  const handleSave = () => {
    console.log("Changing username to:", newUsername);
    onClose();
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Change Username" size="md">
      <div className="space-y-4">
        {/* Current Username */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Current Username
          </label>
          <div className="p-3 bg-red-900/20 rounded-xl border border-red-800/50 text-red-300">
            {currentUsername}
          </div>
        </div>

        {/* New Username */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
          />
          <p className="text-red-400 text-sm mt-1">
            Username can only contain letters, numbers, and underscores
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-red-700/50 text-red-300 rounded-xl hover:bg-red-900/30 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!newUsername}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-900/50 disabled:text-red-400/50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Update Username
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
