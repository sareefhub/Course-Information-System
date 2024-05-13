import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Conf from '../../config';
import Rating from '@mui/material/Rating';
import './HistorySubject.css'

function HistorySubject() {
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
    }, [isFiltered, eduTerm, eduYear]); // เรียก fetchComments เมื่อมีการเปลี่ยนแปลงหรือกรองวิชา

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

    return (
        <div>
            <Navbar />
            <div className="historySubject-container">
                <h3>รายวิชาที่เคยรีวิว</h3>
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
                        subjects.filter(subject => comments[subject.subjectCode] && comments[subject.subjectCode].some(comment => comment.attributes.user === user)).map(subject => (
                            <div className="historySubject-cards" key={subject.subjectId}>
                                <div className="card-content">
                                    <p>{subject.subjectCode} {subject.subjectNameEng}</p>
                                    <p>{subject.subjectNameThai}</p>
                                    <p>เทอม {subject.eduTerm} / ปีการศึกษา {subject.eduYear}</p>
                                    <p>เกรด: {subject.grade}</p>
                                    <p>หน่วยกิต: {subject.credit}</p>
                                    <div className='text-commentreview'>
                                        <button className="btn-historySubject" onClick={() => handleNavigation(`/review/${subject.eduTerm}/${subject.eduYear}/${subject.subjectCode}`)} >ดูรีวิว</button>
                                        <p>แสดงความคิดเห็นของคุณ : </p>
                                        {comments[subject.subjectCode] && comments[subject.subjectCode].map(comment => (
                                            <div key={comment.id}>
                                                <p>{comment.attributes.text}</p>
                                                <Rating
                                                    name="customized-icons"
                                                    value={comment.attributes.rating}
                                                    readOnly
                                                />
                                            </div>
                                        ))}
                                    </div>
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
