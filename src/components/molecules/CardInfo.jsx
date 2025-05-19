const CardInfo = ({ title, value, icon, className = "", bgColor = "bg-white" }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-6 rounded-lg shadow-md ${bgColor} ${className}`}
    >
      <div className="p-3 rounded-full bg-white shadow">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default CardInfo;
