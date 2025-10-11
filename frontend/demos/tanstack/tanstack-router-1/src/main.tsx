/*
What is RouterProvider?
  - You typically create a router using createRouter() and then pass it into RouterProvider;
  - RouterProvider is a React component which makes the router you created available to whole application;
  - So, any component in the application can use hooks like useRouter(), useNavigate();
  - Without wrapping your app in RouterProvider, none of the routes or navigation features would work;
*/
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
