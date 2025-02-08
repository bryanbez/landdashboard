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
import { LandsInputTextbox } from "./landsInputForm";

function LandlordRegistration() {
  const [landProgramName, setLandProgramName] = useState("");
  const [landProgramDesc, setLandProgramDesc] = useState("");
  const landProgramBannerImageRef = useRef(null);
  const [devPtsRate, setDevPtsRate] = useState(0);
  const [landIds, setLandIds] = useState([]);

  const [errors, setErrors] = useState({});

  const [preview, setPreview] = useState(null);
  const { progress, imageUrl, uploadOnBucketStorage } = UploadFileToBucket();
  const { userID } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (landProgramBannerImageRef.current)
      uploadOnBucketStorage(landProgramBannerImageRef.current);

    const formData = {
      landProgramName,
      landProgramDesc,
      landProgramBannerImage: imageUrl ? imageUrl : null,
      devPtsRate: parseFloat(devPtsRate),
      lands: landIds,
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
      landProgramBannerImageRef.current.value = null;
      setLandProgramName("");
      setLandProgramDesc("");
      setDevPtsRate(0);
      landIds.length = 0;
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
                    value={landProgramName}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={(e) => setLandProgramName(e.target.value)}
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
                    value={landProgramDesc}
                    onChange={(e) => setLandProgramDesc(e.target.value)}
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
                    value={devPtsRate}
                    onChange={(e) => setDevPtsRate(e.target.value)}
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
                <LandsInputTextbox
                  landIds={landIds}
                  setLandIds={setLandIds}></LandsInputTextbox>
              </div>
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
