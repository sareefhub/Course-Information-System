import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider';
import { Protector } from './helpers';
import Homepage from "../src/pages/home/Home";
import Review from './pages/review/Review';
import SubjectDetail from './pages/SubjectDetail/SubjectDetail';
import LoginCallbackPage from './auth/loginpsu/LoginCallbackPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/SubjectDetail/:eduTerm/:eduYear/:code" element={<SubjectDetail/>} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/review/:eduTerm/:eduYear/:code" element={<Review />} />

          {/* ต้อง Login */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;