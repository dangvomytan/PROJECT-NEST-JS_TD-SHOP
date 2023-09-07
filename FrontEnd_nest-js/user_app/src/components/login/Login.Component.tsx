import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserApi } from "../../models/user.Model";
import { useNavigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "" || null,
    password: "" || null,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newErrors:any = {};
      
      if (formData.email.trim() === "") {
        newErrors.email = "Please enter your email.";
      }

      if (formData.password.trim() === "") {
        newErrors.password = "Please enter your password.";
      }

      if (Object.keys(newErrors).length > 0) {
        // Có lỗi, hiển thị thông báo lỗi
        setErrors(newErrors);
      } else {
        // Không có lỗi, gửi yêu cầu đăng nhập
        const UserAPI = await UserApi.login(formData).then((res) => res.data);
        if (UserAPI.data.is_Delete === 0) {
          localStorage.setItem("userLogin", JSON.stringify(UserAPI.data));
          localStorage.setItem("accessToken", UserAPI.accessToken);
          navigate("/");
        } else {
          toast.error("Account locked");
        }
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="p-8">
        <h1 className="text-3xl font-black text-slate-700">Login</h1>
        <p className="mt-2 mb-5 text-base leading-tight text-gray-600"></p>
        <form className="mt-8" method="PUT" onSubmit={handleSubmit}>
          <div className="relative mt-2 w-full">
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
              Enter Your Email
            </label>
            {errors.email && (
              <p className="px-3 pt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
              Enter Your Password
            </label>
            {errors.password && (
              <p className="px-3 pt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-bold text-blue-600 no-underline hover:text-blue-400"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
