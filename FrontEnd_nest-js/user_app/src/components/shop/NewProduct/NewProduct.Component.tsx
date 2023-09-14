import React, { useEffect, useState } from "react";
import ProductGridComponent from "../ProductGrid/ProductGrid.Component";
import { ProductApi } from "../../../models/product.Model";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../redux/slice/product.Slice";
import ProductBoxComponent from "../ProductBox/ProductBox.Component";


const NewProductComponent: React.FC = () => {
    const dispatch = useDispatch()
    const[product,setProduct] = useState([])
    //ham xu li goi api
    const handleCallData = async () => {
      try {
        const dataApi: any = await ProductApi.getAllProVerWithPage(1,"","");
        dispatch(setProducts(dataApi))
        console.log(dataApi);
        
        setProduct(dataApi.dataProduct);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      handleCallData();
    }, [])
  
    return(
    <section className="my-2 ">
        <div className="max-w-6xl pt-5 m-auto">
        <h2 className="pb-4 text-4xl font-bold text-center text-gray-800 dark:text-gray-400">
                New product
            </h2>
            <div className="mx-auto mb-16 border-b border-red-700 w-44 dark:border-gray-400"></div>
            <section className="grid grid-cols-4 gap-3">
            {
                product?.length > 0 && product?.map((item:any) => {
                    return (
                        <div key={item.id} >
                            <ProductBoxComponent product={item} />
                        </div>
                    )
                })

            }
            {
                product?.length == 0 && <p>No Products</p>
            }
        </section>
        </div>
    </section>
    )
}
export default NewProductComponent