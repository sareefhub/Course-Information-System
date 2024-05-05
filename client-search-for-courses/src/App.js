import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider';
import { Protector } from './helpers';
import Homepage from "../src/pages/home/Home";
import Review from './pages/review/Review';
import SubjectDetail from './pages/SubjectDetail/SubjectDetail';
import LoginCallbackPage from './auth/loginpsu/LoginCallbackPage';
import Profile from './pages/profile/profile';
import Fanpage from './pages/fanpage/fanpage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/SubjectDetail/:eduTerm/:eduYear/:code" element={<SubjectDetail/>} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/review/:eduTerm/:eduYear/:code" element={<Review />} />
          <Route path="/fanpage" element={<Fanpage />} />

          {/* ต้อง Login */}
          <Route path="/profile" element={<Protector Component={Profile} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;