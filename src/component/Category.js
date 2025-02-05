import React from "react";

import ProductCard from './ProductCard'

function Category({products}) {

    const Mtype = products[0];


    return (
        <div className="mb-[30px]">
            <div className="text-center text-[20px] mb-[20px]">
                {products[0]}
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[10px] gap-y-[10px]">
                {Object.entries(products[1]).map((product, index) => (
                    <ProductCard key={index} Mtype={Mtype} product={product}/>
                ))}
            </div>
        </div>
    );

}

export default Category;