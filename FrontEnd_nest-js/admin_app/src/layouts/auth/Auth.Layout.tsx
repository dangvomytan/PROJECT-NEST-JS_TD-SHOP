import { Outlet } from "react-router-dom";
// import { image } from "../../assets/image";
// import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
          <div
            className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
            style={{
              backgroundImage: 'url(https://anonyviet.com/wp-content/uploads/2016/12/websitehack.jpg)',
            }}
          ></div>
          <div className="w-full sm:w-3/5">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  );
};

export default AuthLayout;
