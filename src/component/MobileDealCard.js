/* DealCard.js */
import React from 'react';
import { useNavigate } from 'react-router-dom'

import './MobileDealCard.css'

function MobileDealCard({ id, image, title, url, cprice, oprice, company }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/deals/details/${id}`)
    }

  return (
    <div onClick={() => handleClick()}>
        <div className='bg-white w-full border-[2px] border-neutral-400 rounded-xl px-[10px] py-[20px] mb-[20px]'>
            <div className='grid grid-cols-4'>
                <div className='w-full flex items-center'>
                    <img src={image} alt={title}/>
                </div>
                <div className='col-span-3 grid grid-rows-3 ml-[10px]'>
                    <div className='row-span-2 flex items-center'>
                        <div className='deal-title font-bold'>{title}</div>
                    </div>                
                    <div className='flex justify-between'>
                        <a href={url} target="_blank" rel="noreferrer"><img className="w-[150px] h-[50px]" alt={company} src={`/assets/${company}.svg`} /></a>
                        <div className=" text-[14px] sm:text-[20px] flex justify-center mt-[10px]" style={{height:"30px"}}>
                            <p className="text-green-600 font-bold" style={{marginRight:"20px"}}>{cprice}</p>
                            <p className="line-through text-red-600 font-bold">{oprice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MobileDealCard;
