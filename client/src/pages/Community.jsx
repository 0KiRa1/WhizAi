import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import {
  Heart,
  Download,
  Copy,
  Sparkles,
  ImageIcon,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', { id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    } 
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied");
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `community-image-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("Downloaded");
    } catch (error) {
      toast.error("Download failed");
    }
  };



  return !loading? (
    <div className="h-[calc(100vh-80px)] overflow-y-auto p-6">

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-[#FA8D16]" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Community Creations
          </h1>

          <p className="text-gray-500">
            Explore AI creations shared by the community
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-[500px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-300 border-t-[#FA8D16] rounded-full animate-spin"></div>
        </div>
      ) : creations.length === 0 ? (
        <div className="h-[500px] flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-16 h-16 mx-auto text-orange-300" />

            <h3 className="mt-4 text-xl font-semibold">
              No creations found
            </h3>

            <p className="text-gray-500 mt-2">
              Community posts will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setPreviewImage(creation.content)}
              >
                <img
                  src={creation.content}
                  alt=""
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-700 line-clamp-3 min-h-[60px]">
                  {creation.prompt}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleLike(creation.id)}>
                      <Heart
                        className={`w-5 h-5 cursor-pointer transition hover:scale-110 ${
                          creation.likes?.includes(user?.id)
                            ? "fill-[#FA8D16] text-[#FA8D16]"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    <span className="text-sm text-gray-600">
                      {creation.likes?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-5">
                  <button
                    onClick={() => copyPrompt(creation.prompt)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-100 text-[#FA8D16] hover:bg-orange-200"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>

                  <button
                    onClick={() => downloadImage(creation.content)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#FA8D16] text-white hover:bg-[#E87F0D]"
                  >
                    <Download className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={previewImage}
              alt=""
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <span className="w-10 h-10 border-4 border-orange-300 border-t-[#FA8D16] rounded-full animate-spin absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>

    </div>
  ) 
};

export default Community;