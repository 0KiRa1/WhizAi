import React, { useEffect, useState } from "react";
import { Gem, Sparkles, Globe, Activity } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import CreationItem from "../components/CreationItem";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "/api/user/get-user-creations",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations(data.creations || []);
        setDashboardData(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-[#FA8D16] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your AI creations and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total Creations
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-800">
                {creations.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#FA8D16] to-[#FFB347] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Current Plan
              </p>

              <h2 className="text-2xl font-bold mt-2 text-gray-800">
                {dashboardData?.plan || "Free"}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#FA8D16] to-[#F55316] flex items-center justify-center">
              <Gem className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Published
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-800">
                {
                  creations.filter(
                    (item) => item.publish === true
                  ).length
                }
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Free Usage
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-800">
                {dashboardData?.free_usage || 0}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Creations
          </h2>

          <span className="px-4 py-1 bg-orange-100 text-[#FA8D16] rounded-full text-sm font-medium">
            {creations.length} Items
          </span>
        </div>

        {creations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-orange-100 p-10 text-center">
            <Sparkles className="w-12 h-12 mx-auto text-orange-300" />

            <h3 className="mt-4 text-lg font-semibold">
              No Creations Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Start using AI tools to generate content.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {creations.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;