/* DealCard.js */
import React from 'react';
import { useNavigate } from 'react-router-dom'
import './DealCard.css';

function DealCard({ id, image, title, url, cprice, oprice, company }) {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/deals/details/${id}`)
  }

  return (
    <div className="deal-card flex flex-col justify-between">
      <img className="deal-image" src={image} alt={title} />
      <h3 className="deal-title font-bold">{title}</h3>
      <div className="deal-content">
        <div className="flex justify-center mt-[10px]" style={{height:"30px"}}>
          <p className="text-green-600 font-bold" style={{marginRight:"20px"}}>{cprice}</p>
          <p className="line-through text-red-600 font-bold">{oprice}</p>
        </div>
        <div className='flex justify-center'>
          <div>
            <div onClick={() => handleClick()} className="btn hover:cursor-pointer">View details</div><br/>
            <a href={url} target="_blank" rel="noreferrer"><img className="w-[150px] h-[50px]" alt={id} src={`/assets/${company}.svg`} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
