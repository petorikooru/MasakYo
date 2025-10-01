import { useState } from "react";
import { Lock } from "lucide-react";
import PopupModal from "./PopupModal";

export default function ChangePasswordPopup({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    console.log("Changing password");
    onClose();
  };

  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid = currentPassword && newPassword && confirmPassword && passwordsMatch;

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Change Password" size="md">
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-red-300 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className={`w-full p-3 bg-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent placeholder-red-400/50 ${
              confirmPassword && !passwordsMatch 
                ? 'border-red-500 focus:ring-red-500 text-red-100' 
                : 'border-red-700/50 focus:ring-red-500 text-red-100'
            }`}
          />
          {confirmPassword && !passwordsMatch && (
            <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
          )}
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
            disabled={!isFormValid}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-900/50 disabled:text-red-400/50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Update Password
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
