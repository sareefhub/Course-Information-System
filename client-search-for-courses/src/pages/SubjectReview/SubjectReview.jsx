import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Conf from '../../config';

function SubjectReview() {
  const [subjects, setSubjects] = useState([]);
  const [eduTerm, setEduTerm] = useState('*');
  const [eduYear, setEduYear] = useState('*');
  const [isFiltered, setIsFiltered] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
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

    fetchSubjects();
  }, [isFiltered, eduTerm, eduYear]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${Conf.apiUrls}/comments`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = response.data;
        const commentsMap = {};

        commentsData.data.forEach(comment => {
          const subjectCode = comment.attributes.subjectCode;
          if (!commentsMap[subjectCode]) {
            commentsMap[subjectCode] = [];
          }
          commentsMap[subjectCode].push(comment);
        });

        setComments(commentsMap);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [isFiltered, eduTerm, eduYear]);

  const handleFilter = () => {
    setIsFiltered(true);
  };

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const accessTokenData = localStorage.getItem('accessToken');
  const accessToken = JSON.parse(accessTokenData);
  const user = accessToken && accessToken.accessToken && accessToken.accessToken.student && accessToken.accessToken.student.data[0].studentId;

  // จำนวนวิชาที่ยังไม่ได้รีวิว
  const subjectsNotReviewed = subjects.filter(subject => !comments[subject.subjectCode] || !comments[subject.subjectCode].some(comment => comment.attributes.user === user));

  return (
    <div>
      <Navbar />
      <div className="historySubject-container">
        <h3>วิชาที่ยังไม่ได้รีวิว</h3>
        <p>จำนวนวิชาที่ยังไม่ได้รีวิว: {subjectsNotReviewed.length}</p>
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
          {Array.isArray(subjectsNotReviewed) && subjectsNotReviewed.length > 0 ? (
            subjectsNotReviewed.map(subject => (
              <div className="historySubject-cards" key={subject.subjectId}>
                <div className="card-content">
                  <button className="btn-historySubject" onClick={() => handleNavigation(`/review/${subject.eduTerm}/${subject.eduYear}/${subject.subjectCode}`)} >รีวิวรายวิชา</button>
                  <p>{subject.subjectCode} {subject.subjectNameEng}</p>
                  <p>{subject.subjectNameThai}</p>
                  <p>เทอม {subject.eduTerm} / ปีการศึกษา {subject.eduYear}</p>
                  <p>เกรด: {subject.grade}</p>
                  <p>หน่วยกิต: {subject.credit}</p>
                </div>
              </div>
            ))
          ) : (
            <p>ยังไม่ได้รีวิว</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectReview;
