import React, { useState } from "react";
import { ImageIcon, Sparkles, Wand2, Copy, Download } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyles = [
    "Realistic",
    "Cartoon",
    "Anime",
    "Pixel Art",
    "3D Render",
    "Ghibli",
    "Oil Painting",
    "Sketch",
    "Pop Art",
    "Cyberpunk",
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const { getToken } = useAuth();

  const downloadImage = async () => {
    try {
      const response = await fetch(image);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `ai-image-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download image");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `Generate an image of  ${input} in ${selectedStyle} style`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setImage(data.content);
        toast.success("Image generated successfully");
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
    navigator.clipboard.writeText(image);
    toast.success("Image URL copied");
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6 overflow-hidden text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-5 bg-gradient-to-br from-white via-orange-50 to-pink-50 rounded-3xl border border-orange-100 shadow-md flex flex-col"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-pink-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#FA8D16]" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              AI Image Generator
            </h1>
            <p className="text-xs text-gray-500">
              Transform your ideas into stunning visuals
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-gray-700">
          Image Prompt
        </p>

        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 mt-2 outline-none text-sm rounded-xl border border-orange-200 resize-none focus:border-[#FA8D16] focus:ring-2 focus:ring-orange-100"
          placeholder="A futuristic city floating above the clouds at sunset..."
          required
        />

        <p className="mt-4 text-sm font-medium text-gray-700">
          Image Style
        </p>

        <div className="mt-3 flex gap-2 flex-wrap">
          {imageStyles.map((style, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(style)}
              className={`text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                selectedStyle === style
                  ? "bg-gradient-to-r from-[#FA8D16] to-pink-500 text-white shadow-md"
                  : "bg-pink-50 text-gray-600 border border-pink-100 hover:bg-orange-100"
              }`}
            >
              {style}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-orange-50 border border-orange-100 px-4 py-2.5">
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Publish to Community
            </h3>
            <p className="text-xs text-gray-500">Share publicly</p>
          </div>

          <input
            type="checkbox"
            checked={publish}
            onChange={() => setPublish(!publish)}
            className="w-4 h-4 accent-[#FA8D16]"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 rounded-xl text-sm bg-gradient-to-r from-[#FA8D16] to-pink-500 text-white py-3 mt-auto shadow-md hover:shadow-lg transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>
      </form>

      <div className="flex-1 bg-gradient-to-br from-white via-orange-50/30 to-pink-50 rounded-3xl border border-orange-100 shadow-md p-6 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-pink-200 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-[#FA8D16]" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Generated Image
              </h1>
              <p className="text-xs text-gray-500">
                Your AI-generated artwork will appear here
              </p>
            </div>
          </div>

          {image && (
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
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          )}
        </div>

        {!image ? (
          <div className="mt-6 flex-1 bg-gradient-to-br from-white to-pink-50 rounded-2xl border border-orange-100 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 via-pink-100 to-pink-200 flex items-center justify-center shadow-sm">
                <ImageIcon className="w-8 h-8 text-[#FA8D16]" />
              </div>

              <h3 className="mt-3 text-base font-semibold text-gray-800">
                Ready to Create Images
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                Describe your imagination, choose a style, and let AI generate
                beautiful artwork in seconds.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-1 min-h-0 flex items-center justify-center">
            <img
              src={image}
              alt="Generated AI"
              className="max-w-full max-h-full object-contain rounded-2xl border border-orange-100 shadow-sm bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;