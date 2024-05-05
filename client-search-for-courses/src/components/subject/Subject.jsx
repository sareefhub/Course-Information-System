import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Conf from '../../config';
import axios from 'axios';
import './Subject.css';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const { eduTerm, eduYear, code } = useParams();

    useEffect(() => {
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
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSubjects();
    }, [eduTerm, eduYear, code]);
    
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
                        ))}
                    </div>
                ))}
            </div>
    );
};

export default Subject;