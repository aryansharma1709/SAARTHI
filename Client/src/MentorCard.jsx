const MentorCard = ({ name, expertise, image }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 transform transition hover:scale-105">
      <img 
        src={image || "/api/placeholder/300/300"} 
        alt={name} 
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-gray-600 text-center">{expertise}</p>
    </div>
  );