import React, { Fragment, useRef, useEffect, useState } from "react";
import { IProduct, ProductApi } from "../../models/product.Model";
import { Dialog, Transition } from "@headlessui/react";
import { Toaster, toast } from "react-hot-toast";
import { CategoryApi, ICategory } from "../../models/category.Model";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const ProductListComponent: React.FC = () => {
  const [productApi, setProductApi] = useState<IProduct[]>([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("")

  const [categoryApi, setCategoryApi] = useState<ICategory[]>([]);
  const [formData, setFormData] = useState({
    category_Id: 0,
    product_Name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [actionType, setActionType] = useState<
    "CREATE" | "UPDATE" | "DELETE"
  >();
  const navigate = useNavigate()

  // ham xu li goi du lieu productApi
  const handleCallDataProductApi = async () => {
    const res: any = await ProductApi.getAll({pages,limit,search});
    console.log(res);
    
    setProductApi(res.dataProduct);
    setPages(res.pages);
    setTotalPage(res.totalPage);
    setLimit(res.limit);
  };

  //Goi API product
  useEffect(() => {
    handleCallDataProductApi();
  }, [pages, limit]);

  //Goi API category
  useEffect(() => {
    const handleCallDataCategoryApi = async () => {
      const res = await CategoryApi.getAll();
      setCategoryApi(res.filter((item) => item.is_Delete === 0));
    };
    handleCallDataCategoryApi();
  }, []);

  // handle xu ly lay du lieu tu from
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle xu ly phan chia hanh dong
  const handleAction = (
    action: "CREATE" | "UPDATE" | "DELETE",
    product?: IProduct
  ) => {
    setActionType(action);
    const newFormData: IProduct = product
      ? {
        ...product
      }
      : {
        category_Id: 0,
        product_Name: "",
        description: "",
        is_Delete: 0,
      };
    setFormData(newFormData);
    setOpen(true);
  };

  //handle xu li submit Them/sua/xoa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (actionType === "DELETE") {
      try {
        await ProductApi.isdelete(formData);
        toast.success("Delete successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error);
      }
    } else if (actionType === "CREATE") {
      try {
        await ProductApi.create(formData);
        toast.success("Create successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error);
      }
    } else {
      try {
        await ProductApi.update(formData);
        toast.success("Update successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error);
      }
    }
    setOpen(false);
  };

  //  Xem ver
  function clickVer(id: number | undefined): void {
    navigate(`/version?pro=${id}`)
  }
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
    handleCallDataProductApi();
  }
  // pagination ---------------------------------------------------------------
  let pageNumbers: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  //================================================================
  return (
    <div>
      {/* Toaster */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Modals */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-11"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form action="/product" method="POST" onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {actionType === "CREATE"
                            ? "CREATE"
                            : actionType === "UPDATE"
                              ? "UPDATE"
                              : "DELETE"}
                        </Dialog.Title>
                      </div>
                      {actionType === "DELETE" ? (
                        <>
                          <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate this product?
                              This action cannot be undone.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Category
                              </label>
                              <select
                                name="category_Id"
                                value={formData.category_Id}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              >
                                <option value="">Select ... </option>
                                {categoryApi.length > 0 &&
                                  categoryApi.map((item) => {
                                    return (
                                      <option key={item.id} value={item.id}>
                                        {item.category_Name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Product name
                              </label>
                              <input
                                type="text"
                                name="product_Name"
                                value={formData.product_Name}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 m-1 text-sm font-semibold text-white  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                        ref={cancelButtonRef}
                      >
                        {actionType === "CREATE"
                          ? "CREATE"
                          : actionType === "UPDATE"
                            ? "UPDATE"
                            : "DELETE"}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 m-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>


      <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
        <div className="">
          <h2
            className="px-6 py-4 pb-0 text-2xl font-medium ">
              List of product
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
                    <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">No.</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">Product name</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">Category</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">Created</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">Description</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400 ">Action</th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400 text-right ">
                      <span onClick={() => handleAction("CREATE")}
                        className=" py-2 px-4 mr-5  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                        Create
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-t">
                  {productApi.length > 0 &&
                    productApi?.map((item: any, index) => {
                      return (
                        <tr key={item.id}
                          className="border-b border-gray-200 dark:border-gray-800">
                          <td className="flex items-center px-6 py-3 text-sm font-medium">
                            <p className="dark:text-gray-400">{index + 1}</p>
                          </td>
                          <td className="px-6 text-sm font-medium dark:text-gray-400">{item.product_Name}</td>
                          <td className="px-6 text-sm font-medium dark:text-gray-400">{item.tbl_category.category_Name}</td>
                          <td className="px-6 text-sm font-medium dark:text-gray-400">{format(parseISO(item.createdAt), "dd/MM/yyyy HH:mm:ss")}</td>
                          <td className="px-6 text-sm font-medium dark:text-gray-400">
                            <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">{item.description}</span>
                          </td>
                          <td className="px-6 text-sm">
                            {
                              item.is_Delete == 0
                                ? (<span className='inline-block px-3 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Enable</span>)
                                : (<span className='inline-block px-3 py-1 text-red-700 bg-red-100 rounded-full dark:bg-gray-800 dark:text-gray-400'>Disable</span>)
                            }
                          </td>
                          <td className="px-6 " colSpan={2}>
                            <div className="flex ">
                              <span onClick={() => clickVer(item.id)}
                                className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="bi bi-three-dots" viewBox="0 0 16 16">
                                  <path
                                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                              </span>
                              <span onClick={() => handleAction("UPDATE", item)}
                                className="px-4 py-2  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                                Edit
                              </span>
                              <span onClick={() => handleAction("DELETE", item)}
                                className="px-4 py-2 ml-2  text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300">
                                Disable
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {productApi.length == 0 && (
                    <tr className="px-6 border-1">
                      <td className="px-6 py-2 text-sm font-medium dark:text-gray-400" colSpan={8}>Not found product</td>
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
    </div>
  );
};

export default ProductListComponent;
