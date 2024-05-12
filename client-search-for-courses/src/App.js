import React from 'react';
import { BrowserRouter , Route , Routes} from "react-router-dom";
import { AuthProvider } from './components/AuthProvider';
import { Protector } from './helpers';
import Homepage from "./pages/searchSubject/searchSubject";
import Review from './pages/reviewDetail/Review';
import SubjectDetail from './pages/SubjectDetail/SubjectDetail';
import LoginCallbackPage from './auth/loginpsu/LoginCallbackPage';
import Fanpage from './pages/fanpage/fanpage';
import Profile from './pages/profile/profile';
import Page from './pages/page/page';
import Reviewpage from './pages/Reviewpage/Reviewpage';
import HistorySubject from './pages/historySubject/historySubject';
import HistorySubjectReview from './pages/historySubjectReview/historySubjectReview';
import SubjectReview from './pages/SubjectReview/SubjectReview';

//แจ่งเตือน
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Page/>} />
          <Route path="/SubjectDetail/:eduTerm/:eduYear/:code" element={<SubjectDetail/>} />
          <Route path="/logincallback" element={<LoginCallbackPage />} />
          <Route path="/review/:eduTerm/:eduYear/:code" element={<Review />} />
          <Route path="/fanpage" element={<Fanpage />} />
          <Route path="/searchSubject" element={<Homepage />} />
          <Route path="/review" element={<Reviewpage />} />

          {/* ต้อง Login */}
          <Route path="/profile" element={<Protector Component={Profile} />} />
          <Route path="/HistorySubject" element={<Protector Component={HistorySubject} />} />
          <Route path="/HistorySubjectReview" element={<Protector Component={HistorySubjectReview} />} />
          <Route path="/SubjectReview" element={<Protector Component={SubjectReview} />} />
        </Routes>
      </AuthProvider>
      <ToastContainer/>
    </BrowserRouter>
    </div>
  );
}

export default App;