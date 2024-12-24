import React from "react";
import NavBar from "./Navigation/NavBar";
import Home from "./Screens/Home";
import Pastes from "./Screens/Pastes";
import NotFound from "./Screens/NotFound";
import ViewPaste from "./Screens/ViewPaste";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar />
          <Home />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <NavBar />
          <Pastes />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <NavBar />
          <ViewPaste />
        </div>
      ),
    },
    {
      path: "*",
      element: (
        <div>
          <NotFound />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
