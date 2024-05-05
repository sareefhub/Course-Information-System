import React from 'react';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import './CourseCard.css';

const CourseCard = ({ code, subjectNameEng, subjectNameThai, credit, campusThai, eduTerm, eduYear }) => {
  return (
    <Link to={`/SubjectDetail/${eduTerm}/${eduYear}/${code}`} className="course-card">
      <div className="card-glow"></div>
      <div className="card-border-glow"></div>
      <div className="card-title">{code} {subjectNameEng}</div>
      <div className="card-body">{subjectNameThai}</div>
      <div className="card-body">หน่วยกิต {credit}</div>
      <div className="card-campus"><span>{campusThai}</span></div>
    </Link>
  );
};

export default CourseCard;
