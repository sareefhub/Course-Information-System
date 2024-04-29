import { useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter , faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import CourseCard from '../../components/card/CourseCard';
import Loader from '../../components/loader/Loader';
import Conf from '../../config';
import FilterModal from '../../components/filterModal/filterModal';
import './Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [showClearIcon, setShowClearIcon] = useState(false);
    const [selectedCampus, setSelectedCampus] = useState(null);

    const filterSubjectOffer = "SubjectOffer";
    const terms = [1, 2, 3];
    const currentYear = new Date().getFullYear();
    const thaiYears = Array.from({ length: 4 }, (_, index) => (currentYear - index) + 543);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setShowClearIcon(event.target.value.trim() !== '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() === '') {
            setErrorMessage(<div className='title-error-handleSubmit'>กรุณาป้อนชื่อวิชาหรือรหัสวิชา</div>);
            setSearchResults([]);
            return;
        }
        if (searchTerm.trim().length < 3) {
            setErrorMessage(<div className='title-error-handleSubmit'>ต้องระบุอย่างน้อย 3 ตัว</div>);
            setSearchResults([]);
            return;
        }
        // เชื่อม API เพื่อค้นหารายวิชา
        setLoading(true);
        axios.get(`${Conf.apiUrl}/${filterSubjectOffer}/${selectedTerm}/${selectedYear}?campasID=&facID=&deptID=&keySearch=${encodeURIComponent(searchTerm)}&offset=0&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'credential': Conf.apiKey
            }
        })
        .then(response => {
            if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // กรองข้อมูลด้วยวิทยาเขตที่เลือก
                const filteredCourses = selectedCampus ? response.data.data.filter(course => course.campusNameThai === selectedCampus) : response.data.data;
                setSearchResults(filteredCourses);
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

    const handleClearInput = () => {
        setSearchTerm('');
        setShowClearIcon(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // สร้างฟังก์ชั่นเพื่อรับค่าวิทยาเขตที่เลือกจาก Modal
    const handleFilterByCampus = (selectedCampus) => {
        setSelectedCampus(selectedCampus);
        setShowModal(false); // ปิด Modal เมื่อเลือกเสร็จ
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-search-bar">
                <div className='home-title'>ค้นหารายวิชา</div>
                <form className="form-search" onSubmit={handleSubmit}>
                    <div className="search-container">
                    {showClearIcon && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="search-icon-remove"
                            onClick={handleClearInput}
                        />
                    )}
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
                            maxLength={30}
                        />
                    </div>
                    <DropdownButton className="dropdown-button" size="lg" title={selectedTerm && selectedYear ? `${selectedTerm}/${selectedYear}` : "เทอม/ปี"}>
                            {thaiYears.map((year) => (
                                terms.reverse().map((term, termIndex) => (
                                <Dropdown.Item 
                                    key={`${year}-${termIndex}`} 
                                    className="dropdown-item"
                                    onClick={() => { setSelectedTerm(term); setSelectedYear(year); }}>
                                    {term}/{year}
                                </Dropdown.Item>
                                ))
                            ))}
                    </DropdownButton>
                    <Button className="Btn-filter" onClick={handleShowModal}>
                        <FontAwesomeIcon
                            icon={faFilter}
                            className="filter-icon"
                        />
                    </Button>
                    <FilterModal showModal={showModal} handleClose={handleCloseModal} handleFilterByCampus={handleFilterByCampus} /> {/* ส่งฟังก์ชั่น handleFilterByCampus ไปยัง FilterModal */}
                </form>
            </div>
            {errorMessage && (
                <div className="error-message">
                    <div>{errorMessage}</div>
                </div>
            )}
            {searchResults.length > 0 && (
                <div className="search-results-info">
                    <div>พบเจอ {searchResults.length} วิชา</div>
                </div>
            )}
            {searchResults.length === 0 && !errorMessage && !loading && (
                <div className="no-results-message">
                    <div>ไม่พบรายวิชาที่ค้นหา</div>
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
        </div>
    );
};

export default Home;
