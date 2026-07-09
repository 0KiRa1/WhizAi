import React, { useState } from "react";
import { Hash, Sparkles, Copy } from "lucide-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Health & Wellness",
    "Travel",
    "Food & Recipes",
    "Finance & Investing",
    "Education & Learning",
    "Lifestyle & Fashion",
    "Entertainment & Pop Culture",
    "Sports & Fitness",
  ];

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
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

  const copyTitles = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied successfully");
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6 overflow-hidden text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-6 bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-3xl border border-orange-100 shadow-md flex flex-col"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#FA8D16]" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Blog Title Generator
            </h1>
            <p className="text-xs text-gray-500">
              Generate engaging blog title ideas instantly
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-gray-700">
          Blog Keyword
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 mt-2 outline-none text-sm rounded-xl border border-orange-200 bg-white focus:border-[#FA8D16] focus:ring-2 focus:ring-orange-100"
          placeholder="Digital Marketing"
          required
        />

        <p className="mt-6 text-sm font-medium text-gray-700">
          Blog Category
        </p>

        <div className="mt-3 flex gap-2 flex-wrap">
          {blogCategories.map((category, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs px-4 py-2 rounded-xl cursor-pointer transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#FA8D16] to-[#F5B041] text-white shadow-md"
                  : "bg-amber-50 text-gray-600 border border-amber-100 hover:bg-orange-100"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 rounded-xl text-sm bg-gradient-to-r from-[#FA8D16] to-[#F5B041] text-white py-3 mt-auto shadow-md hover:shadow-lg transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Hash className="w-5 h-5" />
              Generate Title
            </>
          )}
        </button>
      </form>

      <div className="flex-1 bg-gradient-to-br from-white via-orange-50/40 to-amber-50 rounded-3xl border border-orange-100 shadow-md p-6 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
              <Hash className="w-6 h-6 text-[#FA8D16]" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Generated Blog Titles
              </h1>
              <p className="text-xs text-gray-500">
                Your AI-generated title suggestions will appear here
              </p>
            </div>
          </div>

          {content && (
            <button
              onClick={copyTitles}
              className="flex items-center gap-2 px-4 py-2 bg-[#FA8D16] text-white rounded-lg hover:bg-[#E87F0D] transition-all"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          )}
        </div>

        {!content ? (
          <div className="mt-6 flex-1 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-amber-50 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 flex items-center justify-center shadow-sm">
                <Hash className="w-10 h-10 text-[#FA8D16]" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800">
                Ready to Create Titles
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                Enter a keyword and select a category to generate creative,
                SEO-friendly, and attention-grabbing blog title ideas.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-1 min-h-0">
            <div className="h-full overflow-y-auto bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;