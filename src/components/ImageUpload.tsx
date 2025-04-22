"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const handleCancel = () => {
    setDropzoneKey((prev) => prev + 1);
    toast("Upload canceled", {
      style: {
        borderRadius: "8px",
        background: "#ff4d4f",
        color: "#fff",
      },
    });
  };

  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer">
      <UploadDropzone
        key={dropzoneKey}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          toast.success("Image uploaded successfully!", {
            style: {
              borderRadius: "8px",
              background: "#4CAF50",
              color: "#fff",
            },
          });
        }}
        onUploadError={(error: Error) => {
          if (error.message.includes("File size")) {
            toast.error(
              "Image is larger than 4MB. Please upload a smaller image.",
              {
                style: {
                  borderRadius: "8px",
                  background: "#ff4d4f",
                  color: "#fff",
                },
              }
            );
          } else {
            toast.error(
              "Image is larger than 4MB. Please upload a smaller image.",
              {
                style: {
                  borderRadius: "8px",
                  background: "#333",
                  color: "#fff",
                },
              }
            );
          }
        }}
      />

      <button
        onClick={handleCancel}
        type="button"
        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full shadow-md"
      >
        <XIcon className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

export default ImageUpload;
