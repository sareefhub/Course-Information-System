import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import Conf from '../../config';
import Navbar from '../../components/navbar/Navbar';

const SubjectDetail = () => {
    const { eduTerm, eduYear, code } = useParams();
    const [subject, setSubject] = useState(null);
    const [lecturer, setLecturer] = useState(null);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrl}/SectionOffer/${eduTerm}/${eduYear}?campusID=&facID=&deptID=&keySearch=${code}`, {
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

        const fetchLecturer = async () => {
            try {
                const response = await axios.get(`${Conf.apiUrl}/SectionLecturer/${eduTerm}/${eduYear}/${subject.subjectId}?campusID=&facID=&deptID=&keySearch=`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'credential': Conf.apiKey
                    }
                });
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setLecturer(response.data.data[0]);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSubject();
        if (subject) {
            fetchLecturer();
        }
    }, [eduTerm, eduYear, code, subject]);

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
                                        {lecturer && `${lecturer.lecturerNameThai} ${lecturer.lecturerSnameThai}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="a"
                                        href={`/review/${eduTerm}/${eduYear}/${code}`}
                                    >
                                        Review
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
