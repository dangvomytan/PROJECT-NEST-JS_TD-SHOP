import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { OrderApi } from "../../models/order.Model";

const OrderItemComponent: React.FC = () => {
  const [orderItemApi, setOrderItemApi] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderParam = searchParams.get('order');

  // ham xu li goi du lieu ver
  const handleCallDataOrderApi = async () => {
    const res: any = await OrderApi.getAllItemOreder({ pages, limit, orderParam});
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

export default OrderItemComponent