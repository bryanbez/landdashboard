"use client";

export default function UploadProgress({ progress }) {
  return progress > 0 ? (
    <progress value={progress} max="100" className="w-full" />
  ) : null;
}
