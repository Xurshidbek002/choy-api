import React from "react";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiSolidLogInCircle } from "react-icons/bi";
import { toast } from "react-toastify";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const baseUrl = "https://api.fruteacorp.uz/auth/signin";

  const onSubmit = (data) => {
    axios({
      method: "POST",
      url: "https://api.fruteacorp.uz/auth/signin",
      data: data,
    })
      .then((res) => {
        toast.success("Login success")
        localStorage.setItem("token", res?.data?.data?.accessToken?.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-2xl">
          <h1 className="text-center font-medium text-blue-500 text-2xl">
            Kirish ⛓️‍💥
          </h1>
          <form action="" className="flex flex-col gap-3">
            <label>
              <p className="font-mono text-gray-600">Phone</p>
              <input
                {...register("phone")}
                autocomplate="current-text"
                type="text"
                placeholder="phone"
                className="border border-gray-400 rounded-sm hover:scale-98 focus:scale-103 duration-300 outline-none w-70 p-2"
              />
            </label>
            <label>
              <p className="font-mono text-gray-600">Password</p>
              <input
                {...register("password")}
                autocomplate="current-password"
                type="password"
                placeholder="password"
                className="border border-gray-400 rounded-sm hover:scale-98 focus:scale-103 duration-300 outline-none w-70 p-2"
              />
            </label>
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 flex items-center gap-2 hover:scale-103 active:scale-90 duration-100 px-3 py-1 cursor-pointer rounded-sm text-white font-bold"
            >
              Login
              <BiSolidLogInCircle />
            </button>
            <button className="text-blue-600 hover:scale-103 active:scale-90 duration-100 cursor-pointer">
              Forget passvord
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
