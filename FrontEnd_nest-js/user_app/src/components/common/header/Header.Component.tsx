import React, { Fragment, useEffect, useState } from "react";
import { ICart } from "../../../models/cart.Model";
import { IUser } from "../../../models/user.Model";
import { cartItemApi } from "../../../models/cartItem.Model";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import "./Header.Component.css";



const HeaderComponent: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };
  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const [cart, setCart] = useState<ICart[]>([]);
  const userLogin: IUser | null = JSON.parse(localStorage.getItem('userLogin') || 'null');

  if (userLogin === null) {
    window.location.href = '/login';
  }
  // console.log(userLogin?.id);

  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = await cartItemApi.getCartItemByUser(userLogin?.id) || null;
    setCart(DataApi);
  };
  useEffect(() => {
    handleCallData();
  }, []);

  return (
    <header className="grid sticky  place-items-center w-screen top-0 z-50">
      <div className="min-w-full  bg_color" > {/*border 1 border-collapse border-blue-400 */}
        <div className=" max-w-6xl mx-auto px-6 py-0 bg_color rounded-sm ">
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="Logo text-3xl t_color">TD-Store</h1>
            </div>
            <div className="flex p-3">
              <ul className="flex gap-14 items-center  uppercase t_color ">
                <li><a href="/">
                  Home
                </a>
                </li>
                <li><a href="/shop">
                  Shop
                </a>
                </li>
                <li>About</li>
                <li>Contact</li>
              </ul>
              <div className=" flex gap-5 justify-around ml-14 t_color">
                <div onClick={() => handleSearchToggle()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <a className="relative" href="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  <div className="absolute top-4  left-7 z-40 text-xs t_color">
                    ({cart.length})
                  </div>
                </a>
                <div className="relative" onClick={()=>handleProfileToggle()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute w-2 h-2 top-5 right-1 z-40 bg-green-500 rounded-full"></div>
                </div>

              </div>
            </div>
          </div>
          {/* /* Search */}
          <div >
            <Transition
              show={searchOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="mx-auto w-screen max-w-screen-md py-6 leading-6">
                <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg">
                  <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                  </svg>
                  <input type="name" name="search" className="h-14 w-full rounded-md py-4 pr-40 pl-12 outline-none focus:ring-2" placeholder="Search ..." />
                  <button type="submit" className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-lg bg-gray-900 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700">Search</button>
                </form>
              </div>
            </Transition>
          </div>

          <div className="relative">
          <Transition
              show={profileOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
            <div className="absolute right-0  w-56 mt-2 origin-top-right bg-white shadow-lg rounded-2xl dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 border-b border-gray-200 dark:border-gray-600" role="none">
                <p className="px-4 pt-2 mb-1 font-normal text-gray-500 dark:text-gray-500">Signed in as:</p>
                <a href="#"
                  className="flex px-4 py-2 text-sm font-semibold text-gray-700 border-l-2 border-transparent hover:border-blue-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-blue-500 dark:hover:border-blue-400">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="w-4 h-4 bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                  </span>User@gmail.com</a>
              </div>
              {/* <div className="py-1" role="none">
                <a href="#"
                  className="flex px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent dark:hover:border-blue-400 hover:border-blue-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-blue-500">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="w-4 h-4 bi bi-envelope" viewBox="0 0 16 16">
                      <path
                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>Messages</a>
              </div> */}
              <div className="py-1" role="none">
                <a href="#"
                  className="flex px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent dark:hover:border-blue-400 hover:border-blue-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-blue-500">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="w-4 h-4 bi bi-gear" viewBox="0 0 16 16">
                      <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                  </span>Settings</a>
              </div>
              <div className="py-1" role="none">
                <a href="#"
                  className="flex px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent dark:hover:border-blue-400 rounded-bl-md hover:border-blue-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-blue-500">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="w-4 h-4 hover:text-blue-500 bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                  </span>Logout</a>
              </div>
            </div>
          </Transition>
          </div>


        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
function handleCallData() {
  throw new Error("Function not implemented.");
}

