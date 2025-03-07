import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },

]);
