import React from "react";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import valid from "validator";
import toast, { Toaster } from "react-hot-toast";
import GoogleButton from "./GoogleButton";

const Login = () => {
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(false);
  const [mail, setMail] = useState(false);
  const [notExist, setNotExist] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    valid.isLength(password, { min: 6 }) ? setPass(false) : setPass(true);
    valid.isEmail(email) ? setMail(false) : setMail(true);
    setLoading(true);
    if (valid.isLength(password, { min: 6 }) && valid.isEmail(email)) {
      try {
        const res = await api.post("/auth/login", { email, password });
        toast.success("Login successful");
        navigate("/home/tasks");
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setNotExist(true);
          toast.error("account not found");
        } else if (error.response.status === 500) {
          toast.error("server error");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogle = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="h-full w-full bg-white flex justify-center items-center">
      <Toaster />
      <div className="flex flex-col items-center w-[21rem] md:w-[26rem] p-8 gap-4 shadow-sm shadow-gray-400 rounded-lg">
        <h1 className="text-2xl mb-2">Login</h1>
        <p className="text-[0.85rem] text-red-700 bg-red-50 border border-red-200 rounded-md p-2 text-center">
          Email login is currently unavailable. Please use Google to continue.
        </p>
        <div className="flex flex-col w-full gap-3">
          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="Email"
              className="h-[2.5rem] p-1.5 border-b-1 border-slate-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {mail && (
              <span className="text-[0.8rem] text-red-500 pt-1 pl-1">
                Invalid email
              </span>
            )}
            {notExist && (
              <span className="text-[0.8rem] text-red-500 pt-1 pl-1">
                coundn't find your Account.Please register
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="Password"
              className="h-[2.5rem] p-1.5 border-b-1 border-slate-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {pass && (
              <span className="text-[0.8rem] text-red-500 pt-1 pl-1">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          {!loading ? (
            <button
              className="w-full h-[2.5rem] bg-blue-500 mt-3 text-white cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button className="w-full h-[2.5rem] bg-blue-400 mt-3 text-white disabled">
              Please wait...
            </button>
          )}
        </div>
        <div className="flex items-center w-full gap-2">
          {check ? (
            <MdCheckBox
              onClick={() => setCheck(false)}
              className="text-[1.4rem] text-blue-500 cursor-pointer"
            />
          ) : (
            <MdCheckBoxOutlineBlank
              onClick={() => setCheck(true)}
              className="text-[1.4rem] cursor-pointer"
            />
          )}
          <span>Remember me</span>
        </div>
        <p>
          Don't have account?
          <Link to="/signup">
            <span className="text-blue-500 pl-1 text-[1rem]">signup</span>
          </Link>
        </p>
        <span className="w-full border-1 border-dotted border-gray-300"></span>
        <div className="w-full" onClick={handleGoogle}>
          <GoogleButton text="Login with google" />
        </div>
      </div>
    </div>
  );
};

export default Login;
