import { useState } from "react";
import { Upload, User } from "lucide-react";
import PopupModal from "./PopupModal";
import user_pfp from "../assets/images/pfp.png";

export default function ChangeProfilePicturePopup({ isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Current profile picture from your assets
  const currentProfilePicture = user_pfp;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving profile picture:", selectedImage);
    onClose();
  };

  const handleRemove = () => {
    setSelectedImage(null);
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Change Profile Picture" size="md">
      <div className="space-y-6">
        {/* Current and New Profile Pictures */}
        <div className="flex justify-around items-center">
                    
          {/* Current Profile Picture */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-red-900/20 flex items-center justify-center border-2 border-red-800/50">
                <img 
                  src={currentProfilePicture} 
                  alt="Current Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <p className="text-red-300 text-xs text-center">Current</p>
          </div>

          {/* Arrow Separator */}
          <div className="text-red-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          {/* New Profile Picture */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-red-900/20 flex items-center justify-center border-2 border-red-800/50">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="New Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-red-400" />
                )}
              </div>
              
              {/* Remove button for new image */}
              {selectedImage && (
                <button
                  onClick={handleRemove}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border border-red-500 hover:bg-red-700 transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            <p className="text-red-300 text-xs text-center">New</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-700/50 border-dashed rounded-2xl cursor-pointer hover:bg-red-900/20 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload size={24} className="text-red-400 mb-2" />
              <p className="text-sm text-red-300 font-medium">Click to upload new photo</p>
              <p className="text-xs text-red-400/70 mt-1">PNG, JPG up to 5MB</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-red-400/70 text-sm">
            Upload a new profile picture to replace your current one
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
            disabled={!selectedImage}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-900/50 disabled:text-red-400/50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
