"use client";
import { landlordRegValidationSchema } from "@/app/validation/landlordRegValidationSchema";
import {
  checkLandOnInput,
  registerLandlord,
} from "@/controller/landlordController";
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

  const [loadingIcon, setLoadingIcon] = useState(false); // Tracks verification status

  const [loadingStatus, setLoadingStatus] = useState(null);

  const { progress, imageUrl, uploadOnBucketStorage } = UploadFileToBucket();

  const { userID } = useAuth();

  const handleAddLand = () => {
    setLands([...lands, ""]);
  };

  const removeLandTextbox = (index) => {
    setLands(lands.filter((_, i) => i !== index));
  };

  const handleChange = async (index, event) => {
    const newLands = [...lands];
    newLands[index] = event.target.value;
    setLands(newLands);
  };

  const verifyLandOwnership = async (event) => {
    if (event.target.value.length === 6) {
      setLoadingIcon(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const verifyLandOwnership = await checkLandOnInput(event.target.value);
      if (verifyLandOwnership.success === true) {
        setLoadingStatus("valid");
        console.log("Valid Land");
      } else {
        setLoadingStatus("invalid");
        console.log("Invalid Land");
        console.log("Land not found or not owned");
      }
      setLoadingIcon(false);
    }
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
                  <div key={index} className="relative mb-4">
                    {" "}
                    {/* Wrapper with relative positioning */}
                    <label className="block text-gray-700 font-semibold">
                      Land ID:
                      <button
                        type="button"
                        onClick={() => removeLandTextbox(index)}
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700">
                        ❌
                      </button>
                    </label>
                    {/* Input Box with icons inside */}
                    <div className="relative">
                      <input
                        type="text"
                        value={land}
                        onChange={(event) => handleChange(index, event)}
                        onInput={async (event) =>
                          await verifyLandOwnership(event)
                        }
                        className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />

                      {/* Status Icons inside input box */}
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
                  </div>
                ))}
              </div>

              {loadingStatus === "valid" && (
                <button
                  type="button"
                  onClick={handleAddLand}
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                  {lands.length === 0 ? "Add Land" : "Add Another Land"}
                </button>
              )}
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
      <style jsx>{`
        .loader {
          width: 16px;
          height: 16px;
          border: 3px solid #ddd;
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default LandlordRegistration;
