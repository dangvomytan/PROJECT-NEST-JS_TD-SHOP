import { format, parseISO } from "date-fns";
import React, { Fragment, useRef, useEffect, useState } from "react";
import { OrderApi } from "../../models/order.Model";

const OrderListComponent: React.FC = () => {
  const [orderApi, setOrderApi] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("")

  // ham xu li goi du lieu ver
  const handleCallDataOrderApi = async () => {
    const res: any = await OrderApi.getAll({ pages, limit, search });
    console.log(res);
    setOrderApi(res.dataOrder)
    setPages(res.pages);
    setTotalPage(res.totalPage);
    setLimit(res.limit);
  };

  //Goi API
  useEffect(() => {
    handleCallDataOrderApi();
  }, [pages, limit]);

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
    // handleCallDataVersionApi();
  }
  // pagination ---------------------------------------------------------------
  let pageNumbers: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  //================================================================
  return (
    <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
      <div className="">
        <h2
          className="px-6 py-4 pb-0 text-2xl font-medium ">
          List of order
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
          <thead className="align-bottom bg-gray-100">
            <tr className="text-base text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3 font-medium dark:text-gray-400">No.</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">User</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Method</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Created</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Status</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400 text-right ">
                <span
                  // onClick={() => handleAction("CREATE")}
                  className=" py-2 px-4 mr-5  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                  Create
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="border-t">
            {orderApi.length > 0 &&
              orderApi?.map((item: any, index) => {
                return (
                  <tr key={item.id}
                    className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="mr-4" >{index + 1}</span>
                    </td>
                    <td className="flex items-center px-6 py-3 font-medium">
                      <div className="flex">
                        <div>
                          <p className="text-sm font-medium dark:text-gray-400">{item.tbl_user.first_Name + " " + item.tbl_user.last_Name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{item.tbl_user.email}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{item.phone}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{item.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">{item.method}</span>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">{format(parseISO(item.createdAt), "dd/MM/yyyy HH:mm:ss")}</td>
                    <td className="px-6 text-sm">
                      {
                        item.is_Delete == 0
                          ? (<span className='inline-block px-3 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Enable</span>)
                          : (<span className='inline-block px-3 py-1 text-red-700 bg-red-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Disable</span>)
                      }
                    </td>
                    <td className="px-6 " colSpan={2}>
                      <div className="flex ">
                        <span
                          // onClick={() => clickVer(item.id)}
                          className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path
                              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                          </svg>
                        </span>
                        {/* <span
                          // onClick={() => handleAction("UPDATE", item)}
                          className="px-4 py-2  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                          Edit
                        </span>
                        <span
                          // onClick={() => handleAction("DELETE", item)}
                          className="px-4 py-2 ml-2  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                          Disable
                        </span> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            {orderApi.length == 0 && (
              <tr className="px-6 border-1">
                <td className="px-6 py-2 text-sm font-medium dark:text-gray-400" colSpan={8}>Not found version</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-wrap items-center justify-between px-6 py-3">
          <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">sd {pages} of {totalPage} Pages</p>
          <nav aria-label="page-navigation ">
            <ul className="flex mb-4 list-style-none lg:mb-0">
              {
                pageNumbers.length > 0 && pageNumbers?.map((num) => {
                  return (
                    <li key={num}
                      onClick={() => setPages(num)}
                      className={`relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 ${pages == num ? "dark:hover:bg-gray-700 bg-blue-600 text-white" : "dark:hover:bg-gray-700 hover:bg-blue-100"
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
  )
}

export default OrderListComponent