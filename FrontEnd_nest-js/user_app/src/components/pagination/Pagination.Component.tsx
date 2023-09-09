import React, { useEffect, useState } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux";
import { ProductApi } from "../../models/product.Model";
import { setProducts } from "../../redux/slice/product.Slice";
import ProductGridComponent from "../shop/ProductGrid/ProductGrid.Component";


const PaginationComponent: React.FC = () => {
  const dispatch = useDispatch()
  const stateProduct = useSelector((state:any)=>state.product.data)


  const [pageValue, setPageValue] = useState(1)
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filters, setFilters] =useState();



  const handleCallData = async () => {
    try {
      const dataApi: any = await ProductApi.getAllProVerWithPage(pageValue,filters);
      dispatch(setProducts(dataApi))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleCallData();
  }, [pageValue]);

  useEffect(() => {
    setPage(stateProduct.page);
    // setLimit(stateProduct.limit);
    setTotalPage(stateProduct.totalPage)
    setFilters(stateProduct.filters);
  }, [stateProduct]);


  //hande click page change event
  const handlePageChange = (pageNum: any) => {
    setPageValue(pageNum);
  };
//bien chua nut phan trang
  let pageNumbers:number[] = [];
  // // Giới hạn số lượng nút phân trang được hiển thị (trong ví dụ này, giới hạn là 5)
  const buttonPages:number = 5;
  if (totalPage <= buttonPages) {
    // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng giới hạn
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  }





  // else if (currentPage >= totalPages - Math.floor(limit / 2)) {
  //   // Hiển thị các trang cuối cùng nếu trang hiện tại ở gần cuối
  //   pageNumbers.push(1);
  //   pageNumbers.push('...');
  //   for (let i = totalPages - (limit - 3); i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }
  // }
  // else {
  //   // Hiển thị trang hiện tại ở giữa danh sách
  //   pageNumbers.push(1);
  //   pageNumbers.push('...');
  //   for (let i = currentPage - Math.floor(limit / 5); i <= currentPage + Math.floor(limit / 5); i++) {
  //     if (i > 1)
  //       pageNumbers.push(i);
  //   }
  //   pageNumbers.push('...');
  //   pageNumbers.push(totalPages);
  // }

  return (
    <>
      <ProductGridComponent />


      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">

          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>



        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{page==0?"1":page}</span> of <span className="font-medium">{totalPage==0?'1':totalPage}</span> {' '}
              <span className="font-medium"></span> pages
            </p>
          </div>


          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a> */}
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {
                pageNumbers?.map((pageNum) => {
                  return (
                    <span
                      onClick={() => handlePageChange(pageNum)}
                      key={pageNum}
                      aria-current="page"
                      className={`page-link ${page == pageNum ? 'relative z-10 cursor-pointer inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 hover:border-gray-200 focus:z-20 focus:outline-offset-0'}`}
                    >
                      {pageNum?pageNum:1}
                    </span>
                  )
                })
              }
              {/* <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a> */}
            </nav>
          </div>
        </div>
      </div>
    </>

  )
}
export default PaginationComponent