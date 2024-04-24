import React from 'react';
import './CourseCard.css';

const CourseCard = ({ code, subjectNameEng, subjectNameThai, credit, campusThai }) => {
    return (
        <div className="course-card">
            <div className="card-glow"></div>
            <div className="card-border-glow"></div>
            <div className="card-title">{code} {subjectNameEng}</div>
            <div className="card-body">{subjectNameThai}</div>
            <div className="card-body">หน่วยกิต {credit}</div>
            <div className="card-campus"><span>{campusThai}</span></div> {/* ใช้ span ครอบตัวอักษรที่ต้องการครอบ */}
        </div>
    );
};

export default CourseCard;
