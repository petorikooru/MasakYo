import { useState } from "react";
import { Mail } from "lucide-react";
import PopupModal from "./PopupModal";

export default function ChangeEmailPopup({ isOpen, onClose }) {
  const [currentEmail, setCurrentEmail] = useState("alice@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    console.log("Changing email to:", newEmail);
    onClose();
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Change Email" size="md">
      <div className="space-y-4">
        {/* Current Email */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Current Email
          </label>
          <div className="p-3 bg-red-900/20 rounded-xl border border-red-800/50 text-red-300">
            {currentEmail}
          </div>
        </div>

        {/* New Email */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            New Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email address"
            className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
          />
        </div>

        {/* Password Confirmation */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
          />
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
            disabled={!newEmail || !password}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-900/50 disabled:text-red-400/50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Update Email
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
