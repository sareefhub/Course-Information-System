import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Review.css';

const Review = () => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [subjects, setSubjects] = useState([
        { id: 1, name: '001-103 IDEA TO ENTREPRENEURSHIP', instructor: 'กาญจนาถ จงภักดี' },
    ]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/comments');
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await response.json();
                setComments(commentsData.data);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        fetchComments();
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user || !text || !rating) return;

        const timestamp = new Date().toISOString();
        const data = {
            user,
            text,
            timestamp,
            rating,
            createdAt: timestamp,
            updatedAt: timestamp,
            publishedAt: timestamp
        };

        try {
            const response = await fetch('http://localhost:1337/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            if (!response.ok) {
                throw new Error('Failed to post comment');
            }
            const responseData = await response.json();
            setComments([...comments, responseData.data]);
            setUser('');
            setText('');
            setRating(0);
        } catch (error) {
            console.error('Error posting comment:', error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container-subjects">
                <h2>Subjects</h2>
                {subjects.map(subject => (
                    <div key={subject.id} className="subject">
                        <div className="subject-name">{subject.name}</div>
                        <div className="subject-instructor">Instructor: {subject.instructor}</div>
                    </div>
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
                        <div className="comment-text">{comment.attributes.text}</div>
                        <div className="comment-timestamp">{new Date(comment.attributes.timestamp).toLocaleString()}</div>
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
