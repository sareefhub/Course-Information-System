import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar/Navbar';
import CourseCard from '../components/card/CourseCard';
import Loader from '../components/loader/Loader'; // Import Loader component
import './Home.css';

const coursesData = [
    { id: 1, code: "CS101", name: "Introduction to Computer Science" },
    { id: 2, code: "CS101", name: "Calculus I" },
    { id: 3, code: "ENG102", name: "English Composition" },
    { id: 4, code: "PHYS301", name: "Physics for Engineers" },
    { id: 5, code: "CHEM101", name: "General Chemistry" }
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (searchTerm.trim() === '') {
          setErrorMessage(<div className='title-error-handleSubmit'>กรุณาป้อนชื่อวิชาหรือรหัสวิชา</div>);
          setSearchResults([]);
          return;
      }
      // เพิ่มเงื่อนไขตรวจสอบว่ามีข้อมูลที่ป้อนเข้ามาอย่างน้อย 3 ตัว
      if (searchTerm.trim().length <= 3) {
          setErrorMessage(<div className='title-error-handleSubmit'>กรุณาป้อน 3 ตัวขึ้นไป</div>);
          setSearchResults([]);
          return;
      }
      setLoading(true);
      setTimeout(() => {
          const filteredCourses = coursesData.filter(course =>
              course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              course.code.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredCourses);
          setLoading(false);
          setErrorMessage('');
      }, 1000);
  };
  

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-search-bar">
                <div className='home-title'>ค้นหารายวิชา</div>
                <form onSubmit={handleSubmit}>
                    <div className="search-container">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="search-icon"
                            onClick={handleSubmit}
                        />
                        <input
                            type="text"
                            placeholder="ชื่อวิชาหรือรหัสวิชา"
                            value={searchTerm}
                            onChange={handleChange}
                            className="search-input"
                        />
                    </div>
                </form>
            </div>
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}
            {searchResults.length > 0 && (
                <div className="search-results-info">
                    <p>พบเจอ {searchResults.length} วิชา</p>
                </div>
            )}
            {searchResults.length === 0 && !errorMessage && !loading && (
                <div className="no-results-message">
                    <p>ไม่พบรายวิชาที่ค้นหา</p>
                </div>
            )}     
            {loading && <Loader />}
            <div className="course-cards-container">
                {searchResults.map(course => (
                    <CourseCard key={course.id} code={course.code} name={course.name} />
                ))}
            </div>
        </div>
    );
};

export default Home;
