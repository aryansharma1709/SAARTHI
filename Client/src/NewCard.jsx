const NewsCard = ({ title, description, date }) => (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-600 mb-2">{description}</p>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  );