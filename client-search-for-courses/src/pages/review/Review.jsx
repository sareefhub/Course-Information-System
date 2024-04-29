import React, { useState } from 'react';
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

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!user || !text || !rating) return;
        const timestamp = new Date().toLocaleString();
        setComments([...comments, { user, text, timestamp, rating }]);
        setUser('');
        setText('');
        setRating(0);
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
                {comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <div className="comment-user">{comment.user}</div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-timestamp">{comment.timestamp}</div>
                        <div className="comment-rating">
                            {[...Array(comment.rating)].map((_, index) => (
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
