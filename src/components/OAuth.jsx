import React from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const OAuth = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const temp = params.get("temp");

  const fetchToken = async () => {
    try {
      const res = await api.post("/auth/google/set-cookie", { temp });
      if (res) {
        navigate("/home/tasks");
      }
    } catch (error) {
      toast.error("Authentication failed");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Toaster />
      <span className="text-3xl text-gray-400">Loading...</span>
    </div>
  );
};

export default OAuth;
