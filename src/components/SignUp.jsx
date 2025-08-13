import React from "react";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { Link } from "react-router";
import valid from "validator";
import api from "../lib/axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import GoogleButton from "./GoogleButton";




const SignUp = () => {
  const [check, setCheck] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(false);
  const [mail, setMail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();
  

  const handleSignUp = async () => {
    valid.isLength(password, { min: 6 }) ? setPass(false) : setPass(true);
    valid.isEmail(email) ? setMail(false) : setMail(true);
    setLoading(true);
    try {
      if (valid.isLength(password, { min: 6 }) && valid.isEmail(email)) {
        const res = await api.post("/auth/register", {
          username,
          email,
          password,
        });
        toast.success("Signup successful");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setExist(true);
      } else {
        toast.error("server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href =`${import.meta.env.VITE_BACKEND_URL}/auth/google`
  };

  return (
    <div className="h-[100vh] w-full bg-white flex justify-center items-center">
      <Toaster />
      <div className="flex flex-col items-center w-[21rem] md:w-[26rem] p-8 gap-4 shadow-sm shadow-gray-400 rounded-lg">
        <h1 className="text-2xl mb-2">Sign up</h1>
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Name"
            className="h-[2.5rem] p-1.5 border-b-1 border-slate-500 outline-none"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
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
            {exist && (
              <span className="text-[0.8rem] text-red-500 pt-1 pl-1">
                An account with this email address already exists.
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
              onClick={handleSignUp}
            >
              Sign up
            </button>
          ) : (
            <button className="w-full h-[2.5rem] bg-blue-400 mt-3 text-white disabled">
              Please wait...
            </button>
          )}
        </div>
        <div className="flex items-center w-full gap-1">
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
        <div>
          Already have account?
          <Link to="/login">
            <span className="text-blue-500 pl-1 text-[1rem]">login</span>
          </Link>
        </div>
        <span className="w-full border-1 border-dotted border-gray-300"></span>
        <div className="w-full" onClick={handleGoogle}>
          <GoogleButton text="Signup with google" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
