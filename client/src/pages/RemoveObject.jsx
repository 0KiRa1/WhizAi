import React, { useState } from "react";
import {
  Scissors,
  Upload,
  ImageIcon,
  Copy,
  Download,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [object, setObject] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const handleImageUpload = (file) => {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please upload an image");
    }

    if (!object.trim()) {
      return toast.error("Please enter an object to remove");
    }

    if (object.trim().split(/\s+/).length > 1) {
      return toast.error(
        "Enter a single object like car, tree, person, dog"
      );
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", object.trim().toLowerCase());

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setResultImage(data.content);
        toast.success("Object removed successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText(resultImage);
    toast.success("Image URL copied");
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `object-removed-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Image downloaded");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6 overflow-hidden text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-5 bg-gradient-to-br from-white via-orange-50 to-yellow-50 rounded-3xl border border-orange-100 shadow-md flex flex-col"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-200 flex items-center justify-center">
            <Scissors className="w-5 h-5 text-[#FA8D16]" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Object Remover
            </h1>
            <p className="text-xs text-gray-500">
              Remove unwanted objects from images
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-gray-700">
          Upload Image
        </p>

        <label className="mt-2 h-56 border-2 border-dashed border-orange-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-orange-50 transition overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <Upload className="w-8 h-8 text-[#FA8D16]" />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload image
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </label>

        {image && (
          <div className="mt-3 p-3 rounded-xl bg-orange-50 border border-orange-100 text-sm text-gray-600 truncate">
            {image.name}
          </div>
        )}

        <p className="mt-5 text-sm font-medium text-gray-700">
          Object To Remove
        </p>

        <input
          type="text"
          value={object}
          onChange={(e) => setObject(e.target.value)}
          placeholder="e.g. person, car, tree"
          className="w-full p-3 mt-2 outline-none text-sm rounded-xl border border-orange-200 focus:border-[#FA8D16] focus:ring-2 focus:ring-orange-100"
          required
        />

        <br />

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 rounded-xl text-sm bg-gradient-to-r from-[#FA8D16] to-[#F7C948] text-white py-3 mt-auto shadow-md hover:shadow-lg transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            <>
              <Scissors className="w-5 h-5" />
              Remove Object
            </>
          )}
        </button>
      </form>

      <div className="flex-1 bg-gradient-to-br from-white via-orange-50/30 to-yellow-50 rounded-3xl border border-orange-100 shadow-md p-6 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-yellow-200 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-[#FA8D16]" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Result Preview
              </h1>
              <p className="text-xs text-gray-500">
                Processed image will appear here
              </p>
            </div>
          </div>

          {resultImage && (
            <div className="flex gap-2">
              <button
                onClick={copyImageUrl}
                className="flex items-center gap-2 px-4 py-2 bg-[#FA8D16] text-white rounded-lg text-sm hover:bg-[#E87F0D]"
              >
                <Copy className="w-4 h-4" />
                Copy URL
              </button>

              <button
                onClick={downloadImage}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          )}
        </div>

        {!resultImage ? (
          <div className="mt-6 flex-1 bg-gradient-to-br from-white to-yellow-50 rounded-2xl border border-orange-100 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 via-yellow-100 to-yellow-200 flex items-center justify-center shadow-sm">
                <ImageIcon className="w-8 h-8 text-[#FA8D16]" />
              </div>

              <h3 className="mt-3 text-base font-semibold text-gray-800">
                Upload an Image
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                Upload an image, specify the object you want removed, and let
                AI clean it seamlessly.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-1 min-h-0 flex items-center justify-center">
            <img
              src={resultImage}
              alt="Processed"
              className="max-w-full max-h-full object-contain rounded-2xl border border-orange-100 bg-white shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;