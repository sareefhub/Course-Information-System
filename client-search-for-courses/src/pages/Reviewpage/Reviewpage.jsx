import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Conf from '../../config';
import axios from 'axios';
import "./Reviewpage.css";
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

const Reviewpage = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [eduTerm, setEduTerm] = useState('');
  const [eduYear, setEduYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
      <div>
        <Navbar />
        <div className="reviewpage-contrainer">
          <h3>รีวิวรายวิชา</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="ค้นหารายวิชา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm('')}>ล้าง</button>
          </div>
          <div className="reviewpage-dropdown">
            <label htmlFor="sorting">เรียงลำดับตาม: </label>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="highestRating">ที่มีคะแนนสูงสุด</option>
              <option value="latest">รายวิชาล่าสุด</option>
            </select>
          </div>
          <div className="reviewpagecard-container">
            {subjectData
              .filter(subject =>
                (subject.subjectNameEng && subject.subjectNameEng.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (subject.subjectNameThai && subject.subjectNameThai.includes(searchTerm)) ||
                (subject.subjectCode && subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .sort((a, b) => {
                if (selectedOption === 'highestRating') {
                  return b.averageRating - a.averageRating;
                } else if (selectedOption === 'latest') {
                  return new Date(b.eduYear, b.eduTerm) - new Date(a.eduYear, a.eduTerm);
                } else {
                  return 0;
                }
              })
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((subject, index) => (
                <Link key={index} to={`/review/${subject.eduTerm}/${subject.eduYear}/${subject.subjectCode}`} className="reviewpagecard-link">
                  <div className="reviewpage-card">
                    <h3>{subject.subjectCode} {subject.subjectNameEng}</h3>
                    <p>{subject.subjectNameThai}</p>
                    <p>คะแนน {renderStars(subject.averageRating)} ({subject.averageRating.toFixed(1)})</p>
                  </div>
                </Link>
              ))}
          </div>
          <Stack className='Pagination-Review' >
            <Pagination 
              count={Math.ceil(subjectData.length / itemsPerPage)} 
              page={page} 
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
            />
          </Stack>
        </div>
      </div>
  );
}

export default Reviewpage;
