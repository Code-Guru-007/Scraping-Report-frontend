import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DealCard from '../component/DealCard';
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer';

import Pagination from '../component/Pagination'

import { paginate } from '../utils/paginate';

function Deals({ data }) {
  const { subtype } = useParams();

  const deals = !subtype ? data : data.filter((d) => d["Subtype"].toLowerCase() === subtype.toLowerCase())

  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(deals);

  var dealtitle = "All Deals"

  if ((window.location.pathname).includes('deals'))
    dealtitle = "All Deals";
  else if ((window.location.pathname).includes('home'))
    dealtitle = "Today's Hottest Deals 🔥 ";
  else if ((window.location.pathname).includes('categories'))
    dealtitle = subtype;

  const paginate_deals = paginate(filteredData, currentPage, pageSize);

  useEffect(() => {
    const filtered_Data = searchText ? deals.filter((deal) => deal["Name"].toLowerCase().includes(searchText.toLowerCase())) : deals;
    setFilteredData(filtered_Data);
    setCount(filtered_Data.length);
  }, [searchText, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const scrollToTop = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 15);
      }
    };

    scrollToTop();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1)
  }

  return (
    <div>
      <Navbar onSearch={handleSearchChange} search={true} />
      <section id="featured-deals" className="featured-deals">
        <div className="section-header"><h2 className="section-title font-bold">{dealtitle}</h2></div>
        {paginate_deals.length === 0 ? (<div className='text-center w-full'>There isn't any products</div>) : (
          <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 ">
            {paginate_deals.map((deal, index) => (
              <DealCard
                id={deal.id}
                key={index}
                image={deal.Image}
                title={deal.Name}
                url={deal.Url}
                oprice={deal.Price2}
                cprice={deal.Price1}
                company={deal.Company}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Pagination onPageChange={handlePageChange} totalCount={count} currentPage={currentPage} pageSize={pageSize} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Deals;
