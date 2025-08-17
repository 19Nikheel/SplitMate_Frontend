import React from "react";
import { CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";

export const Alert = ({ type = "info", desc }) => {
  const iconClasses = "w-5 h-5 mr-3";

  const config = {
    success: {
      icon: <CheckCircle className={iconClasses} />,
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
    },
    info: {
      icon: <Info className={iconClasses} />,
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
    },
    warning: {
      icon: <AlertTriangle className={iconClasses} />,
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    danger: {
      icon: <AlertCircle className={iconClasses} />,
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
    },
  };

  const { icon, bg, text, border } = config[type] || config.info;

  return (
    <div
      className={`mt-4 flex flex-col sm:flex-row items-center p-4 sm:p-6 mb-4 text-sm sm:text-base border rounded-lg shadow-md alert-container ${bg} ${text} ${border}`}
      role="alert"
    >
      {icon}
      {/* <span className="font-medium mr-1">{label}:</span> */}
      <span>{desc}</span>
    </div>
  );
};
