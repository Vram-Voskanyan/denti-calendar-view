import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const NotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-200 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-amber-800 text-sm">
            This is a demo project — feel free to pick a time and register (using fake data) 😉 Nothing will happen, I promise!
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-amber-600 hover:text-amber-800 focus:outline-none"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar; 