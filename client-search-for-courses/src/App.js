import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import Homepage from "../src/pages/Home";
import Review from './pages/review/Review';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/review" element={<Review/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
