import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Conf from '../../config';
import axios from 'axios';
import Subject from '../../components/subject/Subject';
import { Rating } from '@mui/material';
import './Review.css';

const Review = () => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const { eduTerm, eduYear, code } = useParams();

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

        // Check if user has already commented
        const accessTokenData = localStorage.getItem('accessToken');
        if (!accessTokenData) {
            console.error('Access token not found.');
            return;
        }
        const accessToken = JSON.parse(accessTokenData);
        const user = accessToken.accessToken.student.data[0].studentId;
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
        const accessTokenData = localStorage.getItem('accessToken');
        if (!accessTokenData) return false;
        const accessToken = JSON.parse(accessTokenData);
        const user = accessToken.accessToken.student.data[0].studentId;
        return comments.some(comment => comment.attributes.user === user);
    };

    return (
        <div>
            <Navbar />
            <Subject />
            {isLoggedIn() && !hasReviewed() ? (
                <form className="review-container" onSubmit={handleCommentSubmit}>
                    <h2>แสดงความคิดเห็น</h2>
                    <textarea
                        className="review-textarea"
                        placeholder="แสดงความคิดเห็นรายวิชานี้อย่างสุภาพ"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                    <button className="Btn-filter" type="submit">Post Comment</button>
                </form>
            ) : isLoggedIn() && hasReviewed() ? (
                <div className="already-reviewed">คุณเคยแสดงความคิดเห็นรายวิชานี้แล้ว</div>
            ) : (
                <div className="login-required">กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น</div>
            )}
            <div className="container-comments">
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="comment-user">{comment.attributes.user.substring(0, 2) + 'xxxxxxx' + comment.attributes.user.slice(-1)}</div>
                        <div className="comment-timestamp">{new Date(comment.attributes.timestamp).toLocaleString()}</div>
                        <div className="comment-text">{comment.attributes.text}</div>
                        <div className="comment-rating">
                            <Rating name="read-only" value={comment.attributes.rating} readOnly />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
