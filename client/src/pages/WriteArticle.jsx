import { Edit, Sparkles, Copy } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 1500, text: "Short (500-800 words)" },
    { length: 2500, text: "Medium (800-1200 words)" },
    { length: 4000, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
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

  const copyArticle = () => {
    navigator.clipboard.writeText(content);
    toast.success("Article copied");
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6 overflow-hidden text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-orange-50 rounded-3xl border border-orange-200 shadow-sm p-6 flex flex-col"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FA8D16] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              AI Article Writer
            </h1>
            <p className="text-xs text-gray-500">
              Create professional articles in seconds
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-700">
          Article Topic
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 mt-2 outline-none text-sm rounded-xl border border-orange-200 bg-white focus:border-[#FA8D16] focus:ring-2 focus:ring-orange-100"
          placeholder="The future of artificial intelligence..."
          required
        />

        <p className="mt-5 text-sm font-medium text-gray-700">
          Article Length
        </p>

        <div className="mt-3 flex gap-2 flex-wrap">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-2 rounded-xl cursor-pointer transition-all border ${
                selectedLength.text === item.text
                  ? "bg-[#FA8D16] text-white border-[#FA8D16]"
                  : "bg-white border-orange-200 text-gray-600 hover:border-[#FA8D16] hover:text-[#FA8D16]"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 rounded-xl text-sm bg-[#FA8D16] text-white py-3 mt-5 shadow-md hover:bg-[#E87F0D] transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Edit className="w-5 h-5" />
              Generate Article
            </>
          )}
        </button>
      </form>

      <div className="flex-1 bg-white rounded-3xl border border-orange-200 shadow-sm p-6 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Edit className="w-6 h-6 text-[#FA8D16]" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Generated Article
              </h1>
              <p className="text-xs text-gray-500">
                AI generated content will appear here
              </p>
            </div>
          </div>

          {content && (
            <button
              onClick={copyArticle}
              className="flex items-center gap-2 px-4 py-2 bg-[#FA8D16] text-white rounded-lg hover:bg-[#E87F0D]"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          )}
        </div>

        {!content ? (
          <div className="mt-6 flex-1 rounded-2xl border border-orange-200 bg-orange-50 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center">
                <Edit className="w-10 h-10 text-[#FA8D16]" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Ready to Generate
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                Enter a topic, choose the article length, and generate a
                high-quality article instantly.
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

export default WriteArticle;