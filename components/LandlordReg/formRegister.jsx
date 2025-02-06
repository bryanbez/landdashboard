"use client";
import { landlordRegValidationSchema } from "@/app/validation/landlordRegValidationSchema";
import { registerLandlord } from "@/controller/landlordController";
import React, { useEffect, useRef, useState } from "react";
import ImageFormInput from "../formImage/imageInput";
import ImagePreview from "../formImage/previewImage";
import UploadProgress from "../formImage/uploadProgress";
import UploadFileToBucket from "@/libs/firebase/image/useFirebaseUpload";
import { useAuth } from "@/app/context/AuthContext";

function LandlordRegistration() {
  const landProgramNameRef = useRef(null);
  const landProgramBannerImageRef = useRef(null);
  const landProgramDescRef = useRef(null);
  const devPtsRateRef = useRef(null);
  const [lands, setLands] = useState([""]);

  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState(null);

  const { progress, imageUrl, uploadOnBucketStorage } = UploadFileToBucket();

  const { userID } = useAuth();

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

    if (landProgramBannerImageRef.current)
      uploadOnBucketStorage(landProgramBannerImageRef.current);

    const formData = {
      landProgramName: landProgramNameRef.current.value,
      landProgramDesc: landProgramDescRef.current.value,
      landProgramBannerImage: imageUrl ? imageUrl : null,
      devPtsRate: parseFloat(devPtsRateRef.current.value),
      lands: lands,
      programOwner: userID,
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

  const handleImageChange = () => {
    if (landProgramBannerImageRef.current) {
      setPreview(URL.createObjectURL(landProgramBannerImageRef.current));
    }
  };

  return (
    <div className="w-3/4 mx-auto min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 transform -translate-y-20">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Landlord Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Section */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Land Program Name:
                  <input
                    type="text"
                    ref={landProgramNameRef}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.landProgramName}
                  </p>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Land Program Description:
                  <textarea
                    cols={8}
                    rows={5}
                    ref={landProgramDescRef}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  <p className="text-red-500 text-xs mt-1">
                    {errors.landProgramDesc}
                  </p>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Rate (USD) per 5,000 dev pts:
                  <input
                    type="number"
                    step="0.01"
                    ref={devPtsRateRef}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-red-500 text-xs mt-1">
                    {errors.devPtsRate}
                  </p>
                </label>
              </div>
            </div>

            {/* Middle Section (Image Upload) */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Land Program Banner Image:
                  <ImageFormInput
                    onFileSelect={(file) => {
                      landProgramBannerImageRef.current = file;
                      handleImageChange(landProgramBannerImageRef.current);
                    }}
                  />
                  <ImagePreview imageUrl={preview} />
                  <UploadProgress progress={progress} />
                </label>
              </div>
            </div>

            {/* Right Section (Land IDs) */}
            <div>
              <p className="text-red-500 text-xs mt-1">{errors.landIds}</p>
              <div className="grid grid-cols-1 gap-4">
                {lands.map((land, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 font-semibold">
                      Land ID:
                      <span>
                        <button
                          type="button"
                          onClick={() => removeLandTextbox(index)}
                          className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700">
                          ❌
                        </button>
                      </span>
                      <input
                        type="text"
                        value={land}
                        onChange={(event) => handleChange(index, event)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddLand}
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                {lands.length === 0 ? "Add Land" : "Add Another Land"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandlordRegistration;
