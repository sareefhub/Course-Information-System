import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Conf from '../../config';
import axios from 'axios';
import './Review.css';

const Review = () => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [subjects, setSubjects] = useState([]);

    // Extract parameters from URL
    const { eduTerm, eduYear, code } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${Conf.apiUrls}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await response.json();
                
                // Filter comments by eduTerm, eduYear, and code
                const filteredComments = commentsData.data.filter(comment => 
                    comment.attributes.eduTerm === parseInt(eduTerm) &&
                    comment.attributes.eduYear === parseInt(eduYear) &&
                    comment.attributes.subjectCode === code
                );
                
                setComments(filteredComments);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrl}/SectionLecturer/${eduTerm}/${eduYear}?campusID=&facID=&deptID=&keySearch=${code}&offset=0&limit=5`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'credential': Conf.apiKey
                    }
                });
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setSubjects(response.data.data);
                } else {
                    // Handle empty response or unexpected format
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchComments();
        fetchSubjects();
    }, [eduTerm, eduYear, code]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user || !text || !rating || !eduTerm || !eduYear || !code) return;
    
        const timestamp = new Date().toISOString();
        const data = {
            user,
            text,
            timestamp,
            rating,
            createdAt: timestamp,
            updatedAt: timestamp,
            publishedAt: timestamp,
            eduTerm,
            eduYear,
            subjectCode: code
        };
    
        try {
            const response = await axios.post(`${Conf.apiUrls}/comments`, { data }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.data) {
                throw new Error('Failed to post comment');
            }
    
            setComments([...comments, response.data.data]);
            setUser('');
            setText('');
            setRating(0);
        } catch (error) {
            console.error('Error posting comment:', error.message);
        }
    };
    
    const uniqueSubjects = [];

    subjects.forEach(subject => {
        const existingSubject = uniqueSubjects.find(item => item.subjectCode === subject.subjectCode);
        if (!existingSubject) {
            uniqueSubjects.push(subject);
        }
    });

    const lecturersBySubject = {};

    subjects.forEach(subject => {
        if (!lecturersBySubject[subject.subjectCode]) {
            lecturersBySubject[subject.subjectCode] = [];
        }
        lecturersBySubject[subject.subjectCode].push({
            lecturerNameThai: subject.lecturerNameThai,
            lecturerSnameThai: subject.lecturerSnameThai
        });
    });

    return (
        <div>
            <Navbar />
            <div className="container-subjects">
                <h2>รีวิววิชา</h2>
                {uniqueSubjects.map(subject => (
            <div key={subject.subjectId} className="subject">
                <div className="subject-name">{subject.subjectCode} {subject.shortNameEng}</div>
                <div className="subject-namethai">{subject.subjectNameThai}</div>
                <div className="subject-AJ">Section {subject.section}</div>
                {Object.keys(lecturersBySubject).map(subjectCode => (
            <div key={subjectCode}>
                {lecturersBySubject[subjectCode].map((lecturer, index) => (
                    <div key={index}>อาจารย์ {lecturer.lecturerNameThai} {lecturer.lecturerSnameThai}</div>
                ))}
            </div>
        ))}            </div>
        ))}
            </div>
            <form className="review-container" onSubmit={handleCommentSubmit}>
                <h2>Comments</h2>
                <input
                    className="review-input"
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <textarea
                    className="review-textarea"
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div>
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            role="button"
                            onClick={() => setRating(index + 1)}
                            style={{ cursor: 'pointer' }}
                        >
                            {index < rating ? "⭐" : "☆"}
                        </span>
                    ))}
                </div>
                <button className="Btn-filter" type="submit">Post Comment</button>
            </form>
            <div className="container-comments">
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="comment-user">{comment.attributes.user}</div>
                        <div className="comment-timestamp">{new Date(comment.attributes.timestamp).toLocaleString()}</div>
                        <div className="comment-text">{comment.attributes.text}</div>
                        <div className="comment-rating">
                            {[...Array(comment.attributes.rating)].map((_, index) => (
                                <span key={index} role="img" aria-label="star">⭐</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
