import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; //Assuming you are using react-toastify. Import it here if you are.
import "react-toastify/dist/ReactToastify.css"; // Import css file if you are using react-toastify.

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.fruteacorp.uz/auth/signin",
        {
          phone: phone,
          password: password,
        }
      );

      toast.success("Muvaffaqiyatli o'tildi!");
      localStorage.setItem("accessToken", response.data.data.accessToken.token);

      navigate("/");
    } catch (error) {
      toast.error("Login xato! Tel.nom va parolni check qiling!");
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center bg-[#9f9f9f] h-[100vh]">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  autoComplete="current-username"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={login}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
