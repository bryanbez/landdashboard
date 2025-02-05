"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../init";

export default function UploadFileToBucket() {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const uploadOnBucketStorage = (fileInput) => {
    const storageRef = ref(storage, `bannerimages/${fileInput.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileInput);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
      },
      async () => {
        const extractImageURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(extractImageURL);
      }
    );
  };

  return { progress, imageUrl, uploadOnBucketStorage };
}
