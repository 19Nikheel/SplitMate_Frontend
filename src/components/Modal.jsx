import { X } from "lucide-react";

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 relative w-80 max-h-[80vh] overflow-y-auto">
        <X
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
