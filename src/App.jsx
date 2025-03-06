import React, { useEffect } from "react";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Login />
  );
}

export default App;
