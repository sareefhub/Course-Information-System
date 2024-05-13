import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import Conf from '../../config';
import Navbar from '../../components/navbar/Navbar';

const SubjectDetail = () => {
    const { eduTerm, eduYear, code } = useParams();
    const [subject, setSubject] = useState(null);
    const [lecturers, setLecturers] = useState([]);
    const [lecturersBySubject, setLecturersBySubject] = useState({});

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrl}/SectionOffer/${eduTerm}/${eduYear}?campusID=&facID=&deptID=&keySearch=${code}&offset=0&limit=2000`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'credential': Conf.apiKey
                    }
                });
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setSubject(response.data.data[0]);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchLecturers = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrl}/SectionLecturer/${eduTerm}/${eduYear}?campusID=&facID=&deptID=&keySearch=${code}&offset=0&limit=2000`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'credential': Conf.apiKey
                    }
                });
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setLecturers(response.data.data);
                    // สร้าง lecturersBySubject จากข้อมูลอาจารย์ทั้งหมด
                    const lecturersBySubject = {};
                    response.data.data.forEach(lecturer => {
                        if (!lecturersBySubject[lecturer.subjectCode]) {
                            lecturersBySubject[lecturer.subjectCode] = [];
                        }
                        lecturersBySubject[lecturer.subjectCode].push(lecturer);
                    });
                    setLecturersBySubject(lecturersBySubject);
                } else {
                    console.error('No lecturer data found');
                }
            } catch (error) {
                console.error('Error fetching lecturer:', error);
            }
        };

        fetchLecturers();
        fetchSubject();
    }, [eduTerm, eduYear, code]);

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    {subject && (
                        <Grid item xs={12}>
                            <Card sx={{ marginBottom: 2, marginTop: 2, backgroundColor: '#e6f2ff', color: 'black' }}>
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography variant="h4" sx={{ marginBottom: 0.5, fontWeight: 'bold' }}>
                                        {subject.subjectCode} {subject.shortNameEng}
                                    </Typography>
                                    <Typography variant="body1">
                                        {subject.subjectNameThai}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        Credit: {subject.credit}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Section
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {subject.section}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Campus
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {subject.campusNameThai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Faculty
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {subject.facNameThai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Department
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {subject.deptNameThai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Student Group
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {subject.studentGroup}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Section Status
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" sx={{ color: 'black' }}>
                                        {subject.sectionStatus}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        Lecturer
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                        {Object.keys(lecturersBySubject).map(subjectCode => (
                                            <div key={subjectCode}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}></Typography>
                                                {lecturersBySubject[subjectCode].map((lecturer, index) => (
                                                    <Typography key={index} variant="body1">{`${lecturer.lecturerNameThai} ${lecturer.lecturerSnameThai}`}</Typography>
                                                ))}
                                            </div>
                                        ))}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="a"
                                        href={`/review/${eduTerm}/${eduYear}/${code}`}
                                        style={{
                                            textDecoration: 'none',
                                            padding: '10px 20px',
                                            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                                            transition: 'box-shadow 0.3s',
                                            marginBottom: '20px',
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.3)' }}
                                        onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 3px 5px rgba(0, 0, 0, 0.2)' }}
                                    >
                                        ดูความคิดเห็นรายวิชานี้
                                    </Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default SubjectDetail;
