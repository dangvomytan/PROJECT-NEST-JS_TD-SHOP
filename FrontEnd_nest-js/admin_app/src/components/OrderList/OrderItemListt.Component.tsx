import React, { useEffect, useState } from "react"
import { OrderItemApi } from "../../models/orderitem.Model";
import { useLocation } from "react-router-dom";

const OrderItemListComponent: React.FC = () => {
  const [orderItemApi, setOrderItemApi] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("")

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderParam = searchParams.get('order');

  // ham xu li goi du lieu ver
  const handleCallDataOrderApi = async () => {
    const res: any = await OrderItemApi.getAll({ pages, limit, orderParam});
    setOrderItemApi(res.dataOrderItem)
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
  // const handleSearchChange = (e: any) => {
  //   const searchValue = e.target.value;
  //   setSearch(searchValue);
  // }
  // click search ---------------------------------------------------------------
  // const handleClickSearch = () => {
  //   handleCallDataVersionApi();
  // }
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
          List of order item
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

          {/* <div className="flex px-4 py-2 my-2 border border-gray-300 rounded-md md:mb-0 dark:border-gray-400">
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
          </div> */}
        </div>

        <table className="w-full table-auto" >
          <thead className="align-bottom bg-gray-100">
            <tr className="text-base text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3 font-medium dark:text-gray-400">No.</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400"></th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Product Name</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Quantity</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Price</th>
              <th className="px-6 py-3 font-medium dark:text-gray-400">Total</th>
            </tr>
          </thead>
          <tbody className="border-t">
            {orderItemApi?.length > 0 &&
              orderItemApi?.map((item: any, index) => {
                return (
                  <tr key={item.id}
                    className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="mr-4" >{index + 1}</span>
                    </td>
                    <td className="flex items-center px-6 py-3 font-medium">
                      <div className="flex">
                        <div>
                          <img src={item.tbl_version.image}
                          className="w-20"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">{item.tbl_product.product_Name} {item.tbl_version.version_Name}</span>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">{item.quantity}</span>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">$ {item.price_Pay}</span>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">$ {Number(item.price_Pay)*Number(item.quantity)}</span>
                    </td>
                  </tr>
                );
              })}
            {orderItemApi?.length == 0 && (
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
                pageNumbers?.length > 0 && pageNumbers?.map((num) => {
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

export default OrderItemListComponent