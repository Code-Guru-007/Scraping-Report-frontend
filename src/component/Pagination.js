import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import { isMobile } from 'react-device-detect';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className='py-0 px-4 border border-slate-400 rounded-lg'>
      <ul
        className="flex"
      >
        {/* Left navigation arrow */}
        <button
          className="font-bold text-slate-600 py-2 mr-2 hover:cursor-pointer flex "
          disabled={currentPage===1 ? true : false}
          onClick={onPrevious}
        >
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
          </span>
          <div className='pr-2 border-r-[1px] border-slate-400'>{!isMobile ? "Previous" : ""}</div>
        </button>
        {paginationRange.map(pageNumber => {
          
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li key={pageNumber} className="font-bold  text-slate-600 py-2 px-0">&#8230;</li>;
          }
      
          // Render our Page Pills
          return (
            <li
              key={pageNumber}
              className={pageNumber === currentPage ?
                "font-bold hover:bg-slate-300 text-black py-2 px-4 border border-black hover:cursor-pointer"
              :"font-bold hover:bg-slate-300 text-slate-600 py-2 px-4 hover:cursor-pointer"}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <button
          className="font-bold text-slate-600 py-2 hover:cursor-pointer flex"
          disabled={currentPage===lastPage ? true : false}
          onClick={onNext}
        >
          <div className='pl-2 border-l-[1px] border-slate-400 ml-2'>{!isMobile ? "Next" : ""}</div>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
          </span>
        </button>
      </ul>
    </div>
  );
};

export default Pagination;