import React from "react";
import ProductBoxComponent from "../ProductBox/ProductBox.Component";

import { useSelector } from "react-redux";


const ProductGridComponent: React.FC= () => {
    const productData = useSelector((state:any) => state.product.data.dataProduct)
    
    return (
        <section className="grid grid-cols-3 gap-3">
            {
                productData?.length > 0 && productData.map((item:any) => {
                    return (
                        <div key={item.id} >
                            <ProductBoxComponent product={item} />
                        </div>
                    )
                })

            }
            {
                productData?.length == 0 && <p>No Products</p>
            }
        </section>
    )
}
export default ProductGridComponent