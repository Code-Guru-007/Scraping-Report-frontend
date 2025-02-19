// import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  // Navigate
} from 'react-router-dom';

import HomePage from './homepage';
import PdfPage from './pdfpage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/pdf/:filename" element={<PdfPage />}/>
    </Routes>
  );
}

export default App;
