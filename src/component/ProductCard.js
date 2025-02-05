import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({product, Mtype}) {

    const navigate = useNavigate();

    const Murl = Mtype;
    const subtype = product[0];

    const handleClick = () => {
        navigate(`/categories/${Murl}/${subtype}`)
    }


    return (
        <div onClick={()=>handleClick()} className="hover:bg-neutral-200 hover:cursor-pointer bg-white border rounded-lg border-neutral-400 p-[10px] grid grid-rows-5">
            <div className="flex items-center row-span-4">
                <img className="mb-[5px]" src={product[1]} alt={product[1]}/>
            </div>
            <div className="flex justify-center items-end">
                <p className="text-center">
                    {product[0]}
                </p>
            </div>
        </div>
    );

}

export default ProductCard;