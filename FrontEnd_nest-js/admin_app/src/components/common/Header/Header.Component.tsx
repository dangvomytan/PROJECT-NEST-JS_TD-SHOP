import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderComponent: React.FC = () => {
  return (
    <>
      <nav
        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main
        navbar-scroll="false"
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            {/* <!-- breadcrumb --> */}
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="text-sm leading-normal">
                <a className="text-black opacity-50" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                className="text-sm pl-2 capitalize leading-normal text-black before:float-left before:pr-2 before:text-black before:content-['/']"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            <h6 className="mb-0 font-bold text-black capitalize">Dashboard</h6>
          </nav>

          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <div className="text-xl">  <BsSearch /></div>
                </span>
                <input
                  type="text"
                  className="pl-12 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-black bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
                  placeholder="Type here..."
                />
              </div>
            </div>

            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              {/* <!-- online builder btn  --> */}
              {/* <li className="flex items-center">
                <a className="inline-block px-8 py-2 mb-0 mr-4 text-xs font-bold text-center text-blue-500 uppercase align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer leading-pro hover:-translate-y-px active:shadow-xs hover:border-blue-500 active:bg-blue-500 active:hover:text-blue-500 hover:text-blue-500 tracking-tight-rem hover:bg-transparent hover:opacity-75 hover:shadow-none active:text-black active:hover:bg-transparent" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
              </li> */}
              <li className="flex items-center">
                <a
                  href="#"
                  className="block px-0 py-2 text-sm font-semibold text-black transition-all ease-nav-brand"
                >
                  <div className="text-2xl">
                    <FaUserAlt />
                  </div>

                  {/* <span className="hidden sm:inline">Sign In</span> */}
                </a>
              </li>
              <li className="flex items-center pl-4 xl:hidden">
                <a
                  href="#"
                  className="block p-0 text-sm text-black transition-all ease-nav-brand"
                  sidenav-trigger
                >
                  <div className="text-2xl">
                    <GiHamburgerMenu />
                  </div>
                </a>
              </li>
              <li className="flex items-center px-4">
                <a
                  href="javascript:;"
                  className="p-0 text-sm text-black transition-all ease-nav-brand"
                >
                  <div className="text-2xl">
                    <IoMdNotifications />
                  </div>
                  {/* <!-- fixed-plugin-button-nav  --> */}
                </a>
              </li>

              {/* <!-- notifications --> */}

              <li className="relative flex items-center pr-2">
                <p className="hidden transform-dropdown-show"></p>
                <a
                  href="javascript:;"
                  className="block p-0 text-sm text-black transition-all ease-nav-brand"
                  dropdown-trigger
                  aria-expanded="false"
                >
                  <div className="text-2xl">
                    <AiTwotoneSetting />
                  </div>
                </a>

                <ul
                  dropdown-menu
                  className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease lg:shadow-3xl duration-250 min-w-44 before:sm:right-8 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent dark:shadow-dark-xl dark:bg-slate-850 bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-black before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                >
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
