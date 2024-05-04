import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider'; // import AuthProvider ที่คุณสร้างขึ้น
import Homepage from "../src/pages/home/Home";
import Review from './pages/review/Review';
import Login from './auth/login';
import LoginCallbackPage from './auth/login/LoginCallbackPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/review/:eduTerm/:eduYear/:code" element={<Review />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;