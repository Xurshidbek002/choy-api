import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Banner from "../Pages/Banner";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
