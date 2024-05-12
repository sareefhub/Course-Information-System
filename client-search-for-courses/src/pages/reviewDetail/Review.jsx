import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Conf from '../../config';
import axios from 'axios';
import Subject from '../../components/hooks/subject/Subject';
import { useGrage } from '../../components/hooks/useGrage';
import { Rating } from '@mui/material';
import './Review.css';

const Review = () => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [sorting, setSorting] = useState('highestRated');
    const { eduTerm, eduYear, code } = useParams();
    const { registered } = useGrage(code);
    const [subjectData, setSubjectData] = useState([]);

    const accessTokenData = localStorage.getItem('accessToken');
    const accessToken = accessTokenData ? JSON.parse(accessTokenData) : null;
    const user = accessToken ? accessToken.accessToken.student.data[0].studentId : null;
    

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrls}/comments`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = response.data;
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

        fetchComments();
    }, [eduTerm, eduYear, code]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!text || !rating || !eduTerm || !eduYear || !code) return;

        const existingComment = comments.find(comment => comment.attributes.user === user);

        if (existingComment) {
            console.error('User has already commented.');
            return;
        }

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
            subjectCode: code,
            subjectNameThai: subjectData.subjectNameThai,
            subjectNameEng: subjectData.subjectNameEng
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
            setText('');
            setRating(0);
        } catch (error) {
            console.error('Error posting comment:', error.message);
        }
    };

    const isLoggedIn = () => {
        return !!localStorage.getItem('accessToken');
    };

    const hasReviewed = () => {
        return user && comments.some(comment => comment.attributes.user === user);
    };

    let sortedComments = [...comments];

    if (sorting === 'highestRated') {
        sortedComments.sort((a, b) => b.attributes.rating - a.attributes.rating);
    } else if (sorting === 'latest') {
        sortedComments.sort((a, b) => new Date(b.attributes.timestamp) - new Date(a.attributes.timestamp));
    }

    return (
        <div>
            <Navbar />
            <Subject setSubjectData={setSubjectData} />
            {isLoggedIn() ? (
                registered ? (
                    !hasReviewed() ? (
                        <form className="review-container" onSubmit={handleCommentSubmit}>
                            <h3>แสดงความคิดเห็น</h3>
                            <textarea
                                className="review-textarea"
                                placeholder="แสดงความคิดเห็นรายวิชานี้อย่างสุภาพ"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                            <div>
                                <Rating
                                    name="simple-controlled"
                                    value={isLoggedIn() ? rating : 0}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                    readOnly={!isLoggedIn()}
                                />
                            </div>
                            <button className="Btn-filter" type="submit">Post Comment</button>
                        </form>
                    ) : (
                        <div className="already-reviewed">คุณเคยแสดงความคิดเห็นรายวิชานี้แล้ว</div>
                    )
                ) : (
                    <div className="not-registered">คุณไม่เคยลงทะเบียนรายวิชานี้</div>
                )
            ) : (
                <div className="login-required">กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น</div>
            )}
            <div className="container-comments">
                <div className="sorting-dropdown">
                    <label htmlFor="sorting">เรียงลำดับตาม: </label>
                    <select
                        id="sorting"
                        value={sorting}
                        onChange={(e) => setSorting(e.target.value)}
                    >
                        <option value="latest">ล่าสุด</option>
                        <option value="highestRated">คะแนนเยอะที่สุด</option>
                    </select>
                </div>

                {sortedComments.length > 0 ? (
                    sortedComments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="comment-user">{comment.attributes.user.substring(0, 2) + 'xxxxxxx' + comment.attributes.user.slice(-1)}</div>
                            <div className="comment-timestamp">{new Date(comment.attributes.timestamp).toLocaleString()}</div>
                            <div className="comment-text">{comment.attributes.text}</div>
                            <div className="comment-rating">
                                <Rating name="read-only" value={comment.attributes.rating} readOnly />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-comments">รายวิชานี้ยังไม่มีการแสดงความคิดเห็น</div>
                )}
            </div>
        </div>
    );
};

export default Review;
