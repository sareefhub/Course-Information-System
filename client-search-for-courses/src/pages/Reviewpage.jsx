import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar";
import Conf from '../config';
import axios from 'axios';
import "./Reviewpage.css";

const Reviewpage = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [eduTerm, setEduTerm] = useState('');
  const [eduYear, setEduYear] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(`${Conf.apiUrls}/comments`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = response.data;
        const subjectDataMap = new Map();
        commentsData.data.forEach(comment => {
          const { subjectCode, rating, eduTerm, eduYear, subjectNameEng, subjectNameThai } = comment.attributes;
          if (subjectDataMap.has(subjectCode)) {
            const { totalRating, count } = subjectDataMap.get(subjectCode);
            subjectDataMap.set(subjectCode, { totalRating: totalRating + rating, count: count + 1, eduTerm, eduYear, subjectNameEng, subjectNameThai });
          } else {
            subjectDataMap.set(subjectCode, { totalRating: rating, count: 1, eduTerm, eduYear, subjectNameEng, subjectNameThai });
          }
        });
        const subjects = Array.from(subjectDataMap.entries()).map(([subjectCode, { totalRating, count, eduTerm, eduYear, subjectNameEng, subjectNameThai }]) => ({
          subjectCode,
          averageRating: totalRating / count,
          eduTerm,
          eduYear,
          subjectNameEng,
          subjectNameThai
        }));
        setSubjectData(subjects);
      } catch (error) {
        console.error('Error fetching subject data:', error.message);
      }
    };
  
    fetchSubjectData();
  }, []);

  const renderStars = (averageRating) => {
    const starCount = Math.round(averageRating); 
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div>
      <Navbar />
      <div className="reviewpage-contrainer">
        <h3>รีวิวรายวิชา</h3>
        <div className="reviewpagecard-container">
          {subjectData.map((subject, index) => (
            <Link key={index} to={`/review/${subject.eduTerm}/${subject.eduYear}/${subject.subjectCode}`} className="reviewpagecard-link">
              <div className="reviewpage-card">
                <h3>{subject.subjectCode} {subject.subjectNameEng}</h3>
                <p>{subject.subjectNameThai}</p>
                <p>คะแนน {renderStars(subject.averageRating)} ({subject.averageRating.toFixed(1)})</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviewpage;
