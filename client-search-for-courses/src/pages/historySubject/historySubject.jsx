import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Conf from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft , faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './historySubject.css';

function HistorySubject() {
  const [subjects, setSubjects] = useState([]);
  const [eduTerm, setEduTerm] = useState('*');
  const [eduYear, setEduYear] = useState('*');
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchSubjects = async () => {
    try {
      const accessTokenData = localStorage.getItem('accessToken');
      const accessToken = JSON.parse(accessTokenData);
      const token = accessToken.accessToken.token;

      const config = {
        headers: {
          credential: Conf.apiKey,
          token: token
        }
      };

      const response = await axios.get(
        `${Conf.apiUrl}/level2/StudentGradeCampus/01/token?eduTerm=${encodeURIComponent(
          eduTerm
        )}&eduYear=${encodeURIComponent(eduYear)}&offset=0&limit=2000`,
        config
      );

      setSubjects(response.data.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [isFiltered, eduTerm, eduYear]);

  const handleFilter = () => {
    setIsFiltered(true);
    fetchSubjects(); // เมื่อกรองข้อมูลใหม่ให้ดึงข้อมูลใหม่
  };

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="historySubject-container">
        <h3>รายวิชาที่เคยเรียน</h3>
        <div className='historySubjects-review'>
          <button className='historySubject-review' onClick={() => handleNavigation('/SubjectReview')}>
            <FontAwesomeIcon icon={faPenToSquare} /> ยังไม่ได้รีวิว
          </button>
          <button className='historySubject-review' onClick={() => handleNavigation('/historySubjectReview')}>
            <FontAwesomeIcon icon={faClockRotateLeft} /> รายวิชาที่เคยรีวิว
          </button>
        </div>
        <div className="filter-container">
          <label htmlFor="eduTerm">เทอม: </label>
          <input
            type="text"
            id="eduTerm"
            value={eduTerm}
            maxLength={1}
            onChange={(e) => setEduTerm(e.target.value)}
          />
          <label htmlFor="eduYear">ปีการศึกษา: </label>
          <input
            type="text"
            id="eduYear"
            value={eduYear}
            maxLength={4}
            onChange={(e) => setEduYear(e.target.value)}
          />
          <button onClick={handleFilter}>ตกลง</button>
        </div>
        <div className="historySubjects-cards">
          {Array.isArray(subjects) && subjects.length > 0 ? (
            subjects.map(subject => (
              <div className="historySubject-cards" key={subject.subjectId}>
                <div className="card-content">
                  <button className="btn-historySubject" onClick={() => handleNavigation(`/SubjectDetail/${subject.eduTerm}/${subject.eduYear}/${subject.subjectCode}`)} >ดูเพิ่มเติม</button>
                  <p>{subject.subjectCode} {subject.subjectNameEng}</p>
                  <p>{subject.subjectNameThai}</p>
                  <p>เทอม {subject.eduTerm} / ปีการศึกษา {subject.eduYear}</p>
                  <p>เกรด: {subject.grade}</p>
                  <p>หน่วยกิต: {subject.credit}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No subjects found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistorySubject;
