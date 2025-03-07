import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiNoWaitingSign } from "react-icons/ci";
import { GiKnightBanner } from "react-icons/gi";
import { IoMdAddCircle } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { BiSolidLogInCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openmodal, setOpenmodal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const navigate = useNavigate();
  const { register, setValue, reset, handleSubmit } = useForm();
  const [banner, setBanner] = useState([]);
  const baseUrl = "https://api.fruteacorp.uz";
  const token = localStorage.getItem("token");

  const modal = () => {
    setOpenmodal(!openmodal);
  };

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = () => {
    axios
      .get(`${baseUrl}/banner`)
      .then((res) => {
        setBanner(res.data.data);
      })
      .catch((err) => console.error("Error fetching banners:", err));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("image", data.image);

    const url = selectedItem
      ? `${baseUrl}/banner/${selectedItem.id}`
      : `${baseUrl}/banner`;
    const method = selectedItem ? "PATCH" : "POST";

    axios({
      url: url,
      method: method,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success(
          selectedItem
            ? "Muvaffaqiyatli tahrirlandi"
            : "Muvaffaqiyatli qo'shildi"
        );
        getBanner();
        setOpenmodal(false);
        reset();
        setSelectedItem(null);
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
        toast.error("Xatolik yuz berdi");
      });
  };

  const showBanner = (banner) => {
    setValue("title", banner.title);
    setValue("link", banner.link);
    setSelectedItem(banner);
    setOpenmodal(true);
  };

  const deleteBanner = (id) => {
    axios({
      url: `${baseUrl}/banner/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("Muvaffaqiyatli o'chirildi");
        getBanner();
      })
      .catch((err) => {
        console.error("Error deleting banner:", err);
        toast.error("Xatolik yuz berdi");
      });
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setDeleteModal(true);
  };

  const DeleteModal = ({ onConfirm, onCancel }) => {
    return (
      <Modal>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-2xl">
          <h1 className="text-center font-medium text-red-500 text-2xl">
            O'chirishni tasdiqlang
          </h1>
          <p className="text-center text-gray-600">
            Haqiqatdan o'chirmoqchimisiz?
          </p>
          <div className="flex justify-between">
            <button
              onClick={onConfirm}
              className="bg-red-500 flex items-center gap-1 hover:scale-103 active:scale-90 duration-100 px-3 py-1 cursor-pointer rounded-sm text-white font-bold"
            >
              O'chirish
              <MdDeleteOutline />
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 flex items-center gap-1 hover:scale-103 active:scale-90 duration-100 px-3 py-1 cursor-pointer rounded-sm text-white font-bold"
            >
              Yopish
              <IoCloseSharp />
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {openmodal && (
        <Modal>
          <div className="bg-white flex flex-col gap-5 p-5 rounded-2xl">
            <h1 className="text-center font-medium text-blue-500 text-2xl">
              {selectedItem ? "Bannerni tahrirlash" : "Malumot qo'shish"}
            </h1>
            <form action="" className="flex flex-col gap-3">
              <label>
                <p className="font-mono text-gray-600">Text</p>
                <input
                  {...register("title")}
                  autocomplate="current-text"
                  type="text"
                  placeholder="Title"
                  className="border border-gray-400 rounded-sm hover:scale-98 focus:scale-103 duration-300 outline-none w-70 p-2"
                />
              </label>
              <label>
                <p className="font-mono text-gray-600">Link</p>
                <input
                  {...register("link")}
                  autocomplate="current-password"
                  type="text"
                  placeholder="Link"
                  className="border border-gray-400 rounded-sm hover:scale-98 focus:scale-103 duration-300 outline-none w-70 p-2"
                />
              </label>

              <input type="file" onChange={handleFile} />
            </form>
            <div className="flex justify-between">
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-500 flex items-center gap-2 hover:scale-103 active:scale-90 duration-100 px-3 py-1 cursor-pointer rounded-sm text-white font-bold"
              >
                Kiritish
                <BiSolidLogInCircle />
              </button>
              <button
                onClick={modal}
                className="text-blue-600 hover:scale-103 active:scale-90 duration-100 cursor-pointer"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteModal && (
        <DeleteModal
          onConfirm={() => {
            deleteBanner(bannerToDelete.id);
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}

      <div className="bg-white w-full">
        <div className="container">
          <div className="Header fixed w-[86vw] bg-white py-5 flex items-center justify-between">
            <div className="text-5xl font-medium flex items-center text-[#00a36f]">
              <h1>Banner</h1>
              <GiKnightBanner />
            </div>
            <button
              onClick={modal}
              className="flex hover:scale-103 active:scale-90 duration-100 items-center px-3 py-1 font-medium border-2 text-[#00a36f] gap-1 border-[#00a36f] rounded-sm"
            >
              Malumot qo'shish
              <IoMdAddCircle />
            </button>
            <button
              onClick={logOut}
              className="text-[#abbb01] hover:scale-103 active:scale-90 duration-100 flex items-center gap-1 font-bold"
            >
              Chiqish
              <RxExit />
            </button>
          </div>

          {/* Banners List */}
          <div className="Banner pt-23 grid grid-cols-3 gap-5">
            {banner.length > 0 ? (
              banner.map((item) => (
                <div
                  key={item.id}
                  className="bg-white overflow-hidden shadow-[3px_7px_12px_#00000050] rounded-lg p-2"
                >
                  <img
                    src={`${baseUrl}/images/${item.image}`}
                    alt={item.title}
                    className="w-full h-50 object-cover rounded-md"
                  />
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold overflow-hidden">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => showBanner(item)}
                        className="text-sm bg-blue-600 rounded-sm px-2 w-19 text-white hover:scale-103 active:scale-90 duration-100 font-semibold"
                      >
                        Taxrirlash
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-sm bg-red-600 rounded-sm px-2 w-19 text-white hover:scale-103 active:scale-90 duration-100 font-semibold"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                  <p className="max-h-5">{item.link}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center">
                <CiNoWaitingSign className="text-9xl" />
                <h2 className="">Bu yerda malumot mavjud emas</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
