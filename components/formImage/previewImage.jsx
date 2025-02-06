"use client";

export default function ImagePreview({ imageUrl }) {
  return imageUrl ? (
    <img
      src={imageUrl}
      alt="Uploaded"
      className="mt-4 w-70 h-70 object-cover"
    />
  ) : null;
}
