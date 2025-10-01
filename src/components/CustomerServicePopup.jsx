import { MessageCircle, Mail, Phone, MessageSquare } from "lucide-react";
import PopupModal from "./PopupModal";

export default function CustomerServicePopup({ isOpen, onClose }) {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours",
      action: "Send Email",
      type: "email"
    },
    {
      icon: Phone,
      title: "Phone Support", 
      description: "Call our customer service team for immediate assistance",
      action: "Call Now",
      type: "phone"
    },
  ];

  const handleContact = (type) => {
    switch (type) {
      case "email":
        console.log("Opening email client");
        window.location.href = "mailto:vanitas@eternal.sky";
        break;
      case "phone":
        console.log("Initiating phone call");
        window.location.href = "tel:+6287871153940";
        break;
      default:
        break;
    }
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Customer Service" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-red-900/20 rounded-2xl border border-red-800/50">
              <MessageCircle size={32} className="text-red-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-red-100">How can we help you?</h3>
          <p className="text-red-300/80 text-sm">
            Our support team is here to assist you with any questions or issues
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-4">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className="p-4 bg-neutral-800/50 rounded-xl border border-red-800/30 hover:border-red-700/50 transition-all duration-200 hover:bg-neutral-800/70"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-900/30 rounded-lg border border-red-800/50">
                    <IconComponent size={20} className="text-red-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-100 mb-1">{method.title}</h4>
                    <p className="text-red-300/70 text-sm mb-3">{method.description}</p>
                    
                    <button
                      onClick={() => handleContact(method.type)}
                      className="px-4 py-2 bg-red-400 text-red-50 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                    >
                      {method.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 border border-red-700/50 text-red-300 rounded-xl hover:bg-red-900/30 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
