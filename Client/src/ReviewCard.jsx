const ReviewCard = ({ name, review, role }) => (
    <div className="bg-white shadow-md rounded-lg p-4 italic">
      <p className="mb-2">"{review}"</p>
      <div className="font-semibold">{name}</div>
      <div className="text-gray-600 text-sm">{role}</div>
    </div>
  );