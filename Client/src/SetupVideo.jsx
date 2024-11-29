import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupVideo = () => {
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    roomId: "",
  });

  const handleVideoCall = () => {
      if (credentials.name && credentials.roomId) {
        console.log(credentials);
        navigate(`/room/${credentials.roomId}?name=${credentials.name}`);
    }
  };

  return (
    <div className="flex gap-4 w-screen h-screen justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-700">
          Setup Video Call
        </h1>
        <div className="flex flex-col items-center mt-8">
          <label className="flex flex-col gap-4 mb-2 text-sm font-medium text-gray-600">
            Enter your name
          </label>
          <input
            type="text"
            className="w-80 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            required
            name="name"
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
          />
          <input
            type="text"
            className="w-80 px-4 py-2 mt-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your room id"
            required
            name="roomId"
            onChange={(e) =>
              setCredentials({ ...credentials, roomId: e.target.value })
            }
          />
          <button
            onClick={handleVideoCall}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
          >
            Start Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupVideo;
