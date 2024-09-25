import React from "react";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
export default function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
