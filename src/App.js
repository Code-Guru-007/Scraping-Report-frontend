import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './index.css'

import Deals from './pages/Deals'
import MobileDeals from './pages/MobileDeals'
import About from './pages/About'
import Details from './pages/Details';
import Categories from './pages/Categories';
import Contact from './pages/Contact';

function App() {

  const [alldata, setAllData] = useState([])
  const [hotdata, setHotData] = useState([])

  useEffect(() => {
    axios.get('https://communitydealsalerts.com/api/mergeJSON')
      .then(response => {
        
        setAllData(response.data);
      })
      .catch(error => {
        console.error('Error fetching merged JSON data:', error);
      });
    
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    const hot = (alldata.filter(data => (data['Off']> 50 && data['Mtype'] !== "Books, Music, and Media")).sort((a, b) => b.Off - a.Off));
    setHotData(hot);
  }, [alldata]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={isMobile === true ? <MobileDeals data={hotdata} /> : <Deals data={hotdata} />} />
        <Route path="/deals" element={isMobile === true ? <MobileDeals data={alldata} /> : <Deals data={alldata} />} />
        <Route path="/deals/details/:id" element={<Details />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:mtype/:subtype' element={isMobile === true ? <MobileDeals data={alldata} /> : <Deals data={alldata} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
