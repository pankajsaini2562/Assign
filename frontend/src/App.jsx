import React from "react";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <div className="font-bold">
      <Body />
      <Toaster />
    </div>
  );
}
