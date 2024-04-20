import React from 'react';
import './CourseCard.css';

const CourseCard = ({ code, name }) => {
    return (
        <div className="course-card">
            <div className="card-content">
                <h3>{code}</h3>
                <p>{name}</p>
            </div>
        </div>
    );
};

export default CourseCard;
