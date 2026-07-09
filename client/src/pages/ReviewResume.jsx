import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  Copy,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [resume, setResume] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!resume) {
      return toast.error("Please upload a resume");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Resume reviewed successfully");
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

  const copyReview = () => {
    navigator.clipboard.writeText(content);
    toast.success("Review copied");
  };

  return (
    <div className="h-[calc(100vh-80px)] p-6 flex gap-6 overflow-hidden text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-5 bg-gradient-to-br from-orange-50 via-white to-orange-100 rounded-3xl border border-orange-100 shadow-md flex flex-col"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#FA8D16]" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Resume Reviewer
            </h1>
            <p className="text-xs text-gray-500">
              Get instant AI-powered resume feedback
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-gray-700">
          Upload Resume
        </p>

        <label className="mt-2 h-52 border-2 border-dashed border-orange-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition overflow-hidden">
          <Upload className="w-8 h-8 text-[#FA8D16]" />

          <p className="mt-2 text-sm text-gray-600">
            Click to upload your resume
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => setResume(e.target.files[0])}
          />
        </label>

        {resume && (
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 text-sm text-gray-600 truncate">
            {resume.name}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Supported formats: PDF, DOC, DOCX
        </p>

        <br />

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 rounded-xl text-sm bg-gradient-to-r from-[#FA8D16] to-[#FDBA74] text-white py-3 mt-auto shadow-md hover:shadow-lg transition-all disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Reviewing...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Review Resume
            </>
          )}
        </button>
      </form>

      <div className="flex-1 bg-gradient-to-br from-white via-orange-50/50 to-orange-100 rounded-3xl border border-orange-100 shadow-md p-6 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-orange-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#FA8D16]" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Resume Analysis
              </h1>
              <p className="text-xs text-gray-500">
                AI feedback and suggestions will appear here
              </p>
            </div>
          </div>

          {content && (
            <button
              onClick={copyReview}
              className="flex items-center gap-2 px-4 py-2 bg-[#FA8D16] text-white rounded-lg text-sm hover:bg-[#E87F0D]"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          )}
        </div>

        {!content ? (
          <div className="mt-6 flex-1 bg-gradient-to-br from-white to-orange-50 rounded-2xl border border-orange-100 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-orange-200 flex items-center justify-center shadow-sm">
                <CheckCircle className="w-8 h-8 text-[#FA8D16]" />
              </div>

              <h3 className="mt-3 text-base font-semibold text-gray-800">
                Upload Your Resume
              </h3>

              <p className="mt-2 text-gray-500 text-sm leading-6">
                Upload your resume and receive AI-powered insights on
                strengths, weaknesses, ATS compatibility, formatting,
                keyword optimization, and improvement areas.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-1 min-h-0">
            <div className="h-full overflow-y-auto bg-white border border-orange-100 rounded-2xl p-6">
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

export default ReviewResume;