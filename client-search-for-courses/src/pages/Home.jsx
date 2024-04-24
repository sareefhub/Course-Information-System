import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch ,faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios
import Navbar from '../components/navbar/Navbar';
import CourseCard from '../components/card/CourseCard';
import Loader from '../components/loader/Loader'; // Import Loader component
import Conf from '../config';
import './Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const [showModal, setShowModal] = useState(false); // State for modal

    const term = 1;
    const year = 2564;
    const filterSubjectOffer = "SubjectOffer" ;

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
        if (searchTerm.trim().length < 3) {
            setErrorMessage(<div className='title-error-handleSubmit'>ต้องระบุอย่างน้อย 3ตัว</div>);
            setSearchResults([]);
            return;
        }
        // เชื่อม API เพื่อค้นหารายวิชา
        setLoading(true);
        axios.get(`${Conf.apiUrl}/${filterSubjectOffer}/${term}/${year}?campasID=&facID=&deptID=&keySearch=${encodeURIComponent(searchTerm)}&offset=0&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'credential': Conf.apiKey
            }
        })
        
        .then(response => {
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                setSearchResults(response.data.data);
                setLoading(false);
                setErrorMessage('');
            } else {
                setErrorMessage(<div className='title-error-handleSubmit'>ไม่พบรายวิชาที่ค้นหา</div>);
                setSearchResults([]);
                setLoading(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage(<div className='title-error-handleSubmit'>มีข้อผิดพลาดเกิดขึ้นในการค้นหารายวิชา</div>);
            setSearchResults([]);
            setLoading(false);
        });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-search-bar">
                <div className='home-title'>ค้นหารายวิชา</div>
                <form className="form-search" onSubmit={handleSubmit}>
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
                    <Button className="Btn-filter-term">1/2564</Button>
                    <Button className="Btn-filter" onClick={handleShowModal}>                        
                        <FontAwesomeIcon
                            icon={faFilter}
                            className="filter-icon"
                        />
                    </Button>
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
                    <CourseCard 
                    key={course.subjectId} 
                    code={course.subjectCode} 
                    subjectNameEng={course.subjectNameEng} 
                    subjectNameThai={course.subjectNameThai} 
                    credit={course.credit}
                    campusThai={course.campusNameThai}
                    />
                ))}
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>กรองรายวิชา</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="filterterm">
                        Hello
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        ปิด
                    </Button>
                    {/* เพิ่มปุ่มเพิ่มเติมหรือสิ่งที่ต้องการทำใน Footer ของ Modal ที่นี่ */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;
