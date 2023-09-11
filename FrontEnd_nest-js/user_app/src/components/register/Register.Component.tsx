import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserApi } from "../../models/user.Model";
import { useNavigate } from "react-router-dom";

const RegisterComponent: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });

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
        // await UserApi.register(formData); 
        toast.success("Create successfully");
        navigate("/login");
      }
     catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    // <>
    //       {/* Toaster */}
    //       <Toaster position="bottom-right" reverseOrder={false} />
    //       {/* Form  */}
    //       <form className="space-y-6" action="resgiter" method="POST" onSubmit={handleSubmit}>
    //   <div>
    //     <div className="flex items-center justify-between">
    //       <label
    //         htmlFor="firstName"
    //         className="block text-sm font-medium leading-6 text-gray-900"
    //       >
    //         First name
    //       </label>
    //     </div>
    //     <div className="mt-2">
    //       <input
    //         id="first_Name"
    //         name="first_Name"
    //         type="text"
    //         autoComplete="first_Name"
    //         onChange={handleChange}
    //         required
    //         className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //       />
    //     </div>
    //   </div>

    //   <div >
    //     <div className="flex items-center justify-between">
    //       <label
    //         htmlFor="last_Name"
    //         className="block text-sm font-medium leading-6 text-gray-900"
    //       >
    //         Last name
    //       </label>
    //     </div>
    //     <div className="mt-2">
    //       <input
    //         id="last_Name"
    //         name="last_Name"
    //         type="text"
    //         autoComplete="last_Name"
    //         onChange={handleChange}
    //         required
    //         className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <div className="flex items-center justify-between">
    //       <label
    //         htmlFor="email"
    //         className="block text-sm font-medium leading-6 text-gray-900"
    //       >
    //         Email address
    //       </label>
    //     </div>

    //     <div className="mt-2">
    //       <input
    //         id="email"
    //         name="email"
    //         type="email"
    //         autoComplete="email"
    //         onChange={handleChange}
    //         required
    //         className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <div className="flex items-center justify-between">
    //       <label
    //         htmlFor="password"
    //         className=" block text-sm font-medium leading-6 text-gray-900"
    //       >
    //         Password
    //       </label>
    //       {/* <div className="text-sm">
    //           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
    //             Forgot password?
    //           </a>
    //         </div> */}
    //     </div>
    //     <div className="mt-2">
    //       <input
    //         id="password"
    //         name="password"
    //         type="password"
    //         autoComplete="current-password"
    //         onChange={handleChange}
    //         required
    //         className="block w-full  rounded-md border-0  p-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <button
    //       type="submit"
    //       className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       Sign in
    //     </button>
    //   </div>
    // </form>
    // </>
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <div className="p-8">
      <h1 className="text-3xl font-black text-slate-700">Register</h1>
      <p className="mt-2 mb-5 text-base leading-tight text-gray-600"></p>
      <form className="mt-8" method="PUT" onSubmit={handleSubmit}>
      <div className="relative mt-2 w-full">
          <input
            type="text"
            id="first_Name"
            name="first_Name"
            onChange={handleChange}
            value={formData.first_Name}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
            Enter Your first name
          </label>
          {/* {errors.email && (
            <p className="px-3 pt-1 text-xs text-red-600">{errors.email}</p>
          )} */}
        </div>
        <div className="relative mt-2 w-full">
          <input
            type="text"
            id="last_Name"
            name="last_Name"
            onChange={handleChange}
            value={formData.last_Name}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
            Enter Your last name
          </label>
          {/* {errors.email && (
            <p className="px-3 pt-1 text-xs text-red-600">{errors.email}</p>
          )} */}
        </div>
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
          {/* {errors.email && (
            <p className="px-3 pt-1 text-xs text-red-600">{errors.email}</p>
          )} */}
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
          {/* {errors.password && (
            <p className="px-3 pt-1 text-xs text-red-600">
              {errors.password}
            </p>
          )} */}
        </div>
        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
        >
          Sign up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
           have an account?{" "}
          <a
            href="#"
            className="font-bold text-blue-600 no-underline hover:text-blue-400"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  </>
  );
};

export default RegisterComponent;
