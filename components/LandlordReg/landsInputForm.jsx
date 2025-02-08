import { useState } from "react";
import LandIdInputModal from "../Modal/landIdInput";

export const LandsInputTextbox = ({ landIds, setLandIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLand = async (newLandIdInput) => {
    if (!newLandIdInput.trim()) return;
    if (landIds.includes(newLandIdInput)) {
      alert("Land ID already exists");
      return;
    }

    setLandIds((prevLands) => [...prevLands, newLandIdInput]); // Add new land
    setIsModalOpen(false); // Close modal
  };

  const removeLandId = (id) => {
    setLandIds(landIds.filter((land) => land !== id));
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Land IDs:
          {landIds.length === 0 ? (
            <p className="text-gray-500">No land IDs added yet.</p>
          ) : (
            landIds.map((id) => (
              <div key={id} className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={id}
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none"
                />
                <button
                  onClick={() => removeLandId(id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  X
                </button>
              </div>
            ))
          )}
        </label>
      </div>

      <button
        type="button"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={() => setIsModalOpen(true)}>
        Add Land
      </button>
      {isModalOpen && (
        <LandIdInputModal
          onAddLand={handleAddLand}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
