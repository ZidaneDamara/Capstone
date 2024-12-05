export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 ";
  const variants = {
    primary:
      "border border-gray-300 text-gray-700 bg-white hover:bg-slate-800 hover:text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 ",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 ",
    card: "w-full border border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r from-red-600 to-red-800 hover:text-white ",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
