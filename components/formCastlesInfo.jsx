"use client";

import React, { useState } from "react";

function RegisterPlayerInfo() {
  const [uids, setUids] = useState([""]);

  const handleAddUid = () => {
    if (uids.length < 5) {
      setUids([...uids, ""]);
    }
  };

  const handleChange = (index, event) => {
    const newUids = [...uids];
    newUids[index] = event.target.value;
    setUids(newUids);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted UIDs:", uids);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Register Player Info</h1>
      <form onSubmit={handleSubmit}>
        {uids.map((uid, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">
              Player UID:
              <input
                type="text"
                value={uid}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddUid}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={uids.length >= 5}>
            Add Another Player UID
          </button>
          <input
            type="submit"
            value="Submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterPlayerInfo;
