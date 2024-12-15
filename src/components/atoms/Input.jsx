const Input = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full rounded-lg border border-gray-300 
            ${Icon ? "pl-10" : "pl-3"} pr-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            placeholder-gray-400 text-gray-900
          `}
        />
      </div>
    </div>
  );
};

export default Input;
