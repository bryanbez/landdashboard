"use client";

export default function ImagePreview({ imageUrl }) {
  return imageUrl ? (
    <img
      src={imageUrl}
      alt="Uploaded"
      className="mt-4 w-40 h-40 object-cover"
    />
  ) : null;
}
