
import React, { useEffect, useState } from "react";
import { CategoryApi } from "../../models/category.Model";
import { ProductApi } from "../../models/product.Model";
import { setProducts } from "../../redux/slice/product.Slice";
import { useDispatch } from "react-redux";


const FilterComponent: React.FC = () => {
    const [catgeoryList, setCatgeoryList] = useState([])
    const [filterValues,setFiltersProduct] = useState("")
    const [currentPage, setCurrentPage] = useState(1); 

    const dispatch = useDispatch()
    //category list
    const handleCallCategoryData = async () => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const DataApi: any = await CategoryApi.getAllCategory()   ;
        setCatgeoryList(DataApi);
    };
    useEffect(() => {
        handleCallCategoryData();
    }, []);
    // s
    const handleCallProductData = async () => {
        try {
          const dataApi: any = await ProductApi.getAllProVerWithPage(currentPage,filterValues);
          setCurrentPage(dataApi.page)
          dispatch(setProducts(dataApi))
        } catch (error) {
          console.error('Error :', error);
        }
      };
      useEffect(() => {
        handleCallProductData();
      }, [filterValues]);

    
    const clickOnClickCategory = (item:any)=>{
        setFiltersProduct("filCate=" + item.id)
    } 
    const clickOnClickBrand = ()=>{
        setFiltersProduct("filBr=iphone")
    }
    return (
        <>
            <div className="p-4 mb-5 bg-white border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                <h2 className="text-xl font-bold dark:text-gray-400"> Categories</h2>
                <div className="w-full pb-2 mb-6 border-b border-gray-00 dark:border-gray-400"></div>
                <ul>
                    {catgeoryList?.length > 0 && catgeoryList?.map((catgeory:any) => {
                        return (
                            <li onClick={() => clickOnClickCategory(catgeory)}
                            className="mb-4 transform transition-transform hover:translate-x-3 cursor-pointer " key={catgeory.id}>
                                <span className="flex items-center dark:text-gray-400 ">
                                    <span className="text-lg hover:border-b">
                                        {catgeory.category_Name}
                                        </span>
                                </span>
                            </li>
                        )
                    })
                    }


                </ul>
                {/* <a href="#" className="text-base font-medium text-blue-500 hover:underline dark:text-blue-400">
                    View More
                </a> */}
            </div>
            <div className="p-4 mb-5 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-xl font-bold dark:text-gray-400">Brand</h2>
                <div className="w-full pb-2 mb-6 border-b border-gray-00 dark:border-gray-400"></div>
                <ul>
                    <li onClick={() => clickOnClickBrand()}
                    className="mb-4 transform transition-transform hover:translate-x-3">
                        <label className="flex items-center dark:text-gray-300">
                            <span className="text-lg dark:text-gray-400">Apple</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="p-4 mb-5 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-900">
                <h2 className="text-2xl font-bold dark:text-gray-400">Price</h2>
                <div className="w-full pb-2 mb-6 border-b border-gray-00 dark:border-gray-400"></div>
                <div>
                    <input type="range" className="w-full h-1 mb-4 bg-blue-100 rounded appearance-none cursor-pointer"min="1" max="500" />
                    <div className="flex justify-between ">
                        <span className="inline-block text-lg font-bold text-blue-400 ">$1</span>
                        <span className="inline-block text-lg font-bold text-blue-400 ">$500</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FilterComponent