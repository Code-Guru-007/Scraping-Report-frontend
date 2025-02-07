import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import EnhancedTable from './newtable';
import PdfPage from './pdfpage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<EnhancedTable/>} />
      <Route path="/pdf/:filename" element={<PdfPage/>}/>
    </Routes>
  );
}

export default App;
