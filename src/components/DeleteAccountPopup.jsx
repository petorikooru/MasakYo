import { useState } from "react";
import { AlertTriangle, Shield, HelpCircle } from "lucide-react";
import PopupModal from "./PopupModal";

export default function DeleteAccountPopup({ isOpen, onClose }) {
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const confirmationText = "I KNOW WHAT I AM DOING";
  const isDeleteEnabled = confirmText === confirmationText && password && isConfirmed;

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
    // Add your account deletion logic here
    onClose();
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Delete Account" size="md">
      <div className="space-y-6">
        {/* Warning Header */}
        <div className="flex items-start gap-4 p-4 bg-red-900/20 rounded-xl border border-red-700/50">
          <AlertTriangle size={24} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-100 mb-2">This action cannot be undone</h3>
            <p className="text-red-300/80 text-sm">
              Deleting your account will permanently remove all your data, recipes, and history. 
              This process is irreversible. :(
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="space-y-3">
          <h4 className="font-medium text-red-200">What will be deleted:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 text-red-300/80">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <span>All of your data in this website</span>
            </div>
            <div className="flex items-center gap-3 text-red-300/80">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <span>Rating on recipes that you have submitted to this website</span>
            </div>
          </div>
        </div>

        {/* Confirmation Steps */}
        <div className="space-y-4">
          {/* Step 1: Type confirmation text */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">
              Type "<span className="font-mono text-red-200">{confirmationText}</span>" to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={confirmationText}
              className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50 font-mono text-sm"
            />
          </div>

          {/* Step 2: Enter password */}
          <div>
            <label className="block text-sm font-medium text-red-300 mb-2">
              Enter your password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your account password"
              className="w-full p-3 bg-neutral-800 border border-red-700/50 text-red-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-400/50"
            />
          </div>

          {/* Step 3: Final confirmation checkbox */}
          <div className="flex items-start gap-3 p-3 bg-red-900/10 rounded-xl border border-red-800/30">
            <input
              type="checkbox"
              id="finalConfirm"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600 bg-neutral-800 border-red-700/50 rounded focus:ring-red-500 focus:ring-2"
            />
            <label htmlFor="finalConfirm" className="text-sm text-red-300/80">
              I understand that this action is permanent and cannot be undone. 
              I have exported any data I wish to keep.
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-red-700/50 text-red-300 rounded-xl hover:bg-red-900/30 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            disabled={!isDeleteEnabled}
            className="flex-1 px-4 py-3 bg-red-700 text-white rounded-xl hover:bg-red-800 disabled:bg-red-900/50 disabled:text-red-400/50 disabled:cursor-not-allowed transition-colors duration-200 font-medium font-semibold"
          >
            Delete Account Forever
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
