import React, { Fragment, useRef, useEffect, useState } from "react";
import { UserApi, IUser } from "../../models/user.Model";
import { Dialog, Transition } from "@headlessui/react";
import { Toaster, toast } from "react-hot-toast";
import { format, parseISO } from 'date-fns';

const UserListComponent: React.FC = () => {
  const [userApi, setUserApi] = useState<IUser[]>([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("")


  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [actionType, setActionType] = useState<
    "CREATE" | "UPDATE" | "DELETE"
  >();
  const [formData, setFormData] = useState<IUser>({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
    is_Delete: 0,
  });
  // call api ----------------------------------------------------------------
  const handleCallDataUserApi = async () => {
    try {
      const res: any = await UserApi.getAll({ pages, limit, search });
      setUserApi(res.dataUser);
      setTotalPage(res.totalPage);
      setLimit(res.limit);
      setPages(res.pages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // useEffect ----------------------------------------------------------------
  useEffect(() => {
    handleCallDataUserApi();
  }, [limit, pages]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleAction = (
  //   action: "CREATE" | "UPDATE" | "DELETE",
  //   user?: IUser
  // ) => {
  //   setActionType(action);
  //   const newFormData: IUser = user ? { ...user } : { ...formData };
  //   setFormData(newFormData);
  //   setOpen(true);
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     if (actionType === "DELETE") {
  //       await UserApi.isdelete(formData);
  //       toast.success("Delete successfully");
  //     } else if (actionType === "CREATE") {
  //       await UserApi.create(formData);
  //       toast.success("Create successfully");
  //     } else {
  //       await UserApi.update(formData);
  //       toast.success("Update successfully");
  //     }
  //     handleCallDataUserApi();
  //     setOpen(false);
  //   } catch (error) {
  //     toast.error("An error occurred");
  //     console.error("API Error:", error);
  //   }
  // };
  // change limit ---------------------------------------------------------------
  const handleLimitChange = (e: any) => {
    const newLimit = parseInt(e.target.value); // Chuyển đổi giá trị từ chuỗi sang số nguyên
    setLimit(newLimit);
    setPages(1)
  }
  // input search ---------------------------------------------------------------
  const handleSearchChange = (e: any) => {
    const searchValue = e.target.value; // Chuyển đổi giá trị từ chuỗi sang số nguyên
    setSearch(searchValue);
  }
  // click search ---------------------------------------------------------------
  const handleClickSearch = () => {
    handleCallDataUserApi();
  }
  // pagination ---------------------------------------------------------------
  let pageNumbers: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  // ===================================================================
  return (
    <div>
      {/* Toaster */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Modals */}
      <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
        <div className="">
        <h2
            className="px-6 py-4 pb-0 text-2xl font-medium ">
              List of user
          </h2>

          <div className="flex flex-wrap items-center justify-between px-4 py-0   dark:border-gray-700">

            <div className="flex items-center pl-3">
              <p className="text-base text-gray-400">Show</p>
              <div className="px-2 py-2 text-xs text-gray-500 ">
                <select 
                name="limit" onChange={handleLimitChange} value={limit}
                  className="block text-base rounded-sm bg-gray-100 cursor-pointer w-11 dark:text-gray-400 dark:bg-gray-700">
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              <p className="text-base text-gray-400">entries</p>
            </div>

            <div className="flex px-4 py-2 my-2 border border-gray-300 rounded-md md:mb-0 dark:border-gray-400">
              <input type="text"
                name="search"
                onChange={handleSearchChange}
                className="w-full pr-4 text-base text-gray-700 outline-0 bg-white dark:text-gray-400 dark:bg-gray-900 placeholder-text-100 "
                placeholder="search..." />
              <button
                onClick={() => handleClickSearch()}
                className="flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-blue-300 hover:text-blue-600">
                <span className="mr-2 text-base ">Go</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
              </button>
            </div>
          </div>

          <table className="w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-base text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                <th className="flex items-center py-4 pl-6 font-medium dark:text-gray-400">
                  <span className="mr-4">No</span>
                  <span>Name</span>
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">Age</th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">Created</th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">Status</th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">Actions</th>
                <th className="px-6 py-4 font-medium dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {userApi.length > 0 && userApi?.map((item: any, index) => {
                return (
                  <tr key={item.id}
                    className="border-b border-gray-200 dark:border-gray-800">
                    <td className="flex items-center px-6 py-3 font-medium">
                      <span className="mr-4" >{index + 1}</span>
                      <div className="flex">
                        <img className="object-cover w-10 h-10 mr-4 rounded-full"
                          src="https://i.postimg.cc/WbPKvgBr/pexels-italo-melo-2379005.jpg" alt="" />
                        <div>
                          <p className="text-sm font-medium dark:text-gray-400">{item.first_Name + " " + item.last_Name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400"></td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">{format(parseISO(item.createdAt), "dd/MM/yyyy HH:mm:ss")}</td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      {
                        item.is_Delete == 0
                          ? (<span className='inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Enable</span>)
                          : (<span className='inline-block px-2 py-1 text-red-700 bg-red-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Disable</span>)
                      }

                    </td>
                    <td className="px-6">
                      <div className="flex ">
                        <a href="#"
                          className="px-4 py-2 mr-4 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path
                              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                          </svg>
                        </a>
                        <a href="#"
                          className="px-4 py-2  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                          {item.is_Delete == 0 ? "Lock" : "Unlock"}
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {userApi.length === 0 && <tr  className="border-b border-gray-200 dark:border-gray-800"><td className="px-6 text-sm font-medium dark:text-gray-400">Not found</td></tr>}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-between px-6 py-3">
            <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">sd {pages} of {totalPage} Pages</p>
            <nav aria-label="page-navigation ">
              <ul className="flex mb-4 list-style-none lg:mb-0">
                {
                  pageNumbers.length > 0 && pageNumbers.map((num) => {
                    return (
                      <li key={num}
                        onClick={() => setPages(num)}
                        className={`relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 ${pages === num ? "dark:hover:bg-gray-700 bg-blue-600 text-white" : "dark:hover:bg-gray-700 hover:bg-blue-100"
                          }`}>
                        <span>
                          {num}
                        </span>
                      </li>
                    )
                  })
                }
              </ul>
            </nav>
          </div>

        </div>
      </div>
    </div>

  );
};

export default UserListComponent;
