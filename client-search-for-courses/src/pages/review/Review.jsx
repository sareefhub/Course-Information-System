import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Conf from '../../config';
import axios from 'axios';
import Subject from '../../components/subject/Subject';
import './Review.css';

const Review = () => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');
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

    const isLoggedIn = () => {
        return !!localStorage.getItem('accessToken');
    };

    return (
        <div>
            <Navbar />
            <Subject />
            {isLoggedIn() ? (
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
            ) : (
                <div className="login-required">กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น</div>
            )}
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
