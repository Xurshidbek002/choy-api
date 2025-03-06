import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { toast } from "react-toastify";

function Banner() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const imageUrl = "https://api.fruteacorp.uz/images";
  const token = localStorage.getItem("accessToken");

  const modal = () => {
    setOpenModal(!openModal);
    setSelectedItem(null);
  };

  const getCategory = () => {
    setLoading(true);
    axios({
      url: "https://api.fruteacorp.uz/banner",
      method: "GET",
    })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const addCategory = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (images) {
      formData.append("image", images[0]);
    }

    axios({
      url: "https://api.fruteacorp.uz/banner",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setopenModal(false);
        toast.success("Ma'lumot qo'shildi!");
        getCategory(); // Yangi ma'lumotlarni yuklash
      })
      .catch((err) => {
        console.log("Xatolik:", err.response?.data);
        toast.error("Xatolik yuz berdi!");
      });
  };

  return (
    <>
      <div className="h-[90vh] overflow-y-scroll scrollbar-hide">
        <div className="flex justify-between py-2 items-center">
          <button
            onClick={modal}
            className="px-3 flex items-center gap-2 py-1 border-2 hover:bg-blue-700 hover:text-white text-blue-700 cursor-pointer font-bold  my-2 rounded-sm border-blue-700"
          >
            Malumot qo'shish
            <BsFileEarmarkPostFill />
          </button>

          <h1 className="text-4xl font-bold text-blue-600">Banner</h1>
        </div>
        {openModal && (
          <div>
            <div
              className="relative z-100"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-900/90 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg pt-5 pl-5 pr-5 bg-white text-left shadow-xl transition-all">
                    <form
                      action=""
                      className="flex flex-col items-center gap-5"
                    >
                      <h1 className="text-2xl font-bold text-blue-600">
                        Malumot qo'shish
                      </h1>
                      <input
                        className="border outline-none focus:bg-gray-100 focus:scale-102 duration-500 hover:scale-98 border-gray-500 p-1 rounded-sm w-full pl-2"
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Choy nomi"
                        value={title}
                      />
                      <input
                        className="border outline-none focus:bg-gray-100 focus:scale-102 duration-500 hover:scale-98 border-gray-500 p-1 rounded-sm w-full pl-2"
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        placeholder="Berilgan link"
                        value={link}
                      />
                      <input
                        onChange={(e) => setImages(e.target.files[0])}
                        type="file"
                        className=" bg-blue-400 focus:scale-102 duration-500 hover:scale-98 w-full rounded-sm  p-1"
                      />
                      <div className="bg-gray-50  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          onClick={addCategory}
                          type="button"
                          className="inline-flex active:scale-70 duration-100 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 sm:ml-3 sm:w-auto"
                        >
                          Save
                        </button>
                        <button
                          onClick={modal}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
          pb-10"
        >
          {loading ? (
            <>
              <div
                className="inline-block h-40 w-40 animate-spin rounded-full border-9  border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute left-[50%] top-[50%]"
                role="status"
              ></div>
            </>
          ) : (
            categories.map((category) => (
              <div
                className="gap-5 bg-gray-300 h-70 rounded-xl relative"
                key={category.id}
              >
                <div className="flex justify-center mt-2 absolute right-2 top-1 z-10">
                  <button className="w-20 rounded-tl-xl  bg-blue-600 hover:bg-blue-500 text-white">
                    Edit
                  </button>
                  <button className="w-20 rounded-br-xl bg-red-600 hover:bg-red-500 text-white">
                    Delete
                  </button>
                </div>
                <div className=" w-full  rounded-md h-full">
                  <img
                    className="w-full h-full rounded-md object-cover"
                    src={`${imageUrl}/${category.image}`}
                    alt={category.title}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-bl-xl rounded-br-xl from-black/90 transform duration-300 to-transparent"></div>
                </div>
                <div className="absolute w-full items-center flex justify-between  px-5 z-10 bottom-4">
                  <div className="">
                    <h1 className="text-blue-600 font-bold text-[24px] text-shadow-sm">
                      <span className="text-white">Name: </span>
                      {category.title}
                    </h1>
                    <h1 className="text-white text-[10px] text-shadow-md  ">
                      Link:{category.link}
                    </h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Banner;
