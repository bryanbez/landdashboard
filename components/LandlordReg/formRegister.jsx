"use client";
import { landlordRegValidationSchema } from "@/app/validation/landlordRegValidationSchema";
import { registerLandlord } from "@/controller/landlordController";
import React, { useRef, useState } from "react";

function LandlordRegistration() {
  const landProgramNameRef = useRef(null);
  const landProgramBannerImageRef = useRef(null);
  const landProgramDescRef = useRef(null);
  const devPtsRateRef = useRef(null);
  const [lands, setLands] = useState([""]);

  const [errors, setErrors] = useState({});

  const handleAddLand = () => {
    setLands([...lands, ""]);
  };

  const removeLandTextbox = (index) => {
    setLands(lands.filter((_, i) => i !== index));
  };

  const handleChange = (index, event) => {
    const newLands = [...lands];
    newLands[index] = event.target.value;
    setLands(newLands);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      landProgramName: landProgramNameRef.current.value,
      landProgramDesc: landProgramDescRef.current.value,
      landProgramBannerImage: landProgramBannerImageRef.current.files[0],
      devPtsRate: parseFloat(devPtsRateRef.current.value),
      lands: lands,
    };

    try {
      await landlordRegValidationSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});

      const registerLandlordResponse = await registerLandlord(formData);

      if (!registerLandlordResponse.success) {
        setErrors({ message: registerLandlordResponse.message });
        return;
      }

      console.log("Landlord registered successfully");
      console.log(registerLandlordResponse);
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Landlord Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Land Program Name:
                <input
                  type="text"
                  ref={landProgramNameRef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.landProgramName}
                </p>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Land Program Description:
                <textarea
                  cols={8}
                  rows={5}
                  ref={landProgramDescRef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                <p className="text-red-500 text-xs mt-1">
                  {errors.landProgramDesc}
                </p>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Rate (In USD) per 5,000 dev pts:
                <input
                  type="number"
                  step="0.01"
                  ref={devPtsRateRef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="text-red-500 text-xs mt-1">{errors.devPtsRate}</p>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Land Program Banner Image:
                <input
                  type="file"
                  ref={landProgramBannerImageRef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
          </div>
          <div>
            <p className="text-red-500 text-xs mt-1">{errors.landIds}</p>
            <div className="grid grid-cols-3 gap-4">
              {lands.map((land, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700">
                    Land ID:
                    <span>
                      <button
                        onClick={() => removeLandTextbox(index)}
                        className="bg-red-500 text-white  rounded-md hover:bg-red-700">
                        ❌
                      </button>
                    </span>
                    <input
                      type="text"
                      value={land}
                      onChange={(event) => handleChange(index, event)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddLand}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              {lands.length === 0 ? "Add Land" : "Add Another Land"}
            </button>
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        />
      </form>
    </div>
  );
}

export default LandlordRegistration;
