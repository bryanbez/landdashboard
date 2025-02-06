import { useEffect } from "react";

export default function ErrorModal({ errors, onClose }) {
  if (errors.length === 0) return null; // Don't render if there are no errors

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <ul className="mt-4 text-gray-800">
          {errors.map((error, index) => (
            <li key={index} className="text-sm">
              • {error}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
}
