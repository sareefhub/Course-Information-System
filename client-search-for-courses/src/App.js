import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider'; // import AuthProvider ที่คุณสร้างขึ้น
import Homepage from "../src/pages/home/Home";
import Review from './pages/review/Review';
import Login from './auth/login';
import LoginCallbackPage from './pages/login/LoginCallbackPage';
import GridPage from './pages/fanpage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/review/:eduTerm/:eduYear/:code" element={<Review />} />
          <Route path="/gridpage" element={<GridPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;