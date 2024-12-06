import React from "react";

export default function Input({ label, icon: Icon, type, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-blue-300 h-[50px]"
        />
      </div>
    </div>
  );
}
