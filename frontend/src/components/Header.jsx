import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
export default function Header() {
  const navigate = useNavigate();
  //lohout
  const onSignOut = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`);
      console.log(response);
      if (response.data.success) {
        console.log("topa");
        navigate("/");
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };
  return (
    <header
      className="bg-slate-400
    p-4 shadow-md    flex"
    >
      <div
        className="container 
       mx-auto
       flex
       justify-between
       
      items-center"
      >
        <div className="flex text-3xl font-bold">ExpanseTracker</div>
        <div>
          {" "}
          <button
            onClick={onSignOut}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300 cursor-pointer"
          >
            SignOut
          </button>
        </div>
      </div>
    </header>
  );
}
