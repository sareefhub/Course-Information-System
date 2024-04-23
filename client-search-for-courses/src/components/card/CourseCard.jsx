import React from 'react';
import './CourseCard.css';

const CourseCard = ({ code, subjectNameEng, subjectNameThai, credit }) => {
    return (
        <div className="course-card">
            <div className="card-glow"></div>
            <div className="card-border-glow"></div>
            <div className="card-title">{code} {subjectNameEng}</div>
            <div className="card-body">{subjectNameThai}</div>
            <div className="card-body">หน่วยกิต {credit}</div>
            <div className="card-body">วิทยาเขต : หาดใหญ่ </div>
        </div>
    );
};

export default CourseCard;
