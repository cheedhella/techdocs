import { RouterProvider } from "@tanstack/react-router";
import { routerInstance } from "./router";
import { CssBaseline, GlobalStyles } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            width: "100vw",
            height: "100vh",
            overflow: "auto", // Add scroll for content that overflows
          },
        }}
      />
      <RouterProvider router={routerInstance} />
    </>
  );
}