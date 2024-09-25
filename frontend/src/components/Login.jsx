import React, { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //login
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          navigate("/home");
          toast.success(response.data.msg);
        }
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
      }
    } else {
      //signup
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setName("");
        setEmail("");
        setPassword("");
        console.log(response);
        if (response.data.success) {
          setIsLogin(true);
          toast.success(response.data.msg);
        }
      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
      }
    }
  };
  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-[#2b3749]">
      <div className="flex items-center  justify-around w-[80%]">
        <div className="flex flex-col gap-4">
          <div className="text-[#eab308] text-7xl font-semibold ">Expense</div>{" "}
          <div
            className="text-[#ffffff]
          text-6xl font-semibold
          "
          >
            Tracker{" "}
          </div>{" "}
          <div
            className="text-[#ffffff]
            font-semibold
          text-6xl
          "
          >
            App!!
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1
            className="text-[#fffaf0]
          text-4xl font-semibold "
          >
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form
            className="flex flex-col gap-3 w-[95%] mt-7"
            onSubmit={handleOnSubmit}
          >
            {!isLogin && (
              <>
                <input
                  className="px-8 py-3 rounded-full w-full
                outline-yellow-500
                border-yellow-500
                "
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter your name"
                />
              </>
            )}

            <input
              className="px-8 py-3 
               outline-yellow-500
              border-yellow-500
              rounded-full"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter the email"
            />
            <input
              className="px-12 py-3 
               outline-yellow-500
              border-yellow-500
              rounded-full"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter the password"
            />
            <button
              className="px-12 py-3 
            bg-[#ca8a04] text-xl
              rounded-full"
            >
              {isLogin ? "Login" : "Create  Account"}
            </button>
            <p className="flex items-center gap-2">
              <span className="text-[#e1b321]">
                {isLogin
                  ? "Do not have an account?"
                  : "Already have an account?"}
              </span>
              <span
                className="cursor-pointer text-white
                font-semibold 
                "
                onClick={loginSignupHandler}
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
