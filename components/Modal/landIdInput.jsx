import { checkLandOnInput } from "@/controller/landlordController";
import { useEffect, useState } from "react";

export default function LandIdInputModal({ onAddLand, onClose }) {
  const [landId, setLandId] = useState("");
  const [error, setError] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(false); // Tracks verification status
  const [loadingStatus, setLoadingStatus] = useState(null);

  const verifyLandOwnership = async (event) => {
    if (event.target.value.length < 6) {
      setLoadingStatus(null);
      setError("");
    }

    if (event.target.value.length === 6) {
      setLoadingIcon(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const verifyLandOwnership = await checkLandOnInput(event.target.value);
      if (verifyLandOwnership.success === true) {
        setLoadingStatus("valid");
        onAddLand(event.target.value);
      } else {
        setLoadingStatus("invalid");
        setError("Land not found or not owned");
      }

      setLoadingIcon(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <label className="block text-gray-700 font-semibold">
          Input Land ID
        </label>
        {/* Input Box with icons inside */}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <div className="relative">
          <input
            type="text"
            value={landId}
            onChange={(e) => setLandId(e.target.value)}
            onInput={async (e) => await verifyLandOwnership(e)}
            className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {loadingIcon && <span className="loader"></span>}
            {loadingStatus === "valid" && (
              <span className="text-green-500">✔️</span>
            )}
            {loadingStatus === "invalid" && (
              <span className="text-red-500">❌</span>
            )}
          </span>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
}
