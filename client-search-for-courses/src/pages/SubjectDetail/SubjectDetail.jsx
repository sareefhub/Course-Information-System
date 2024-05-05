import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import Conf from '../../config';
import Navbar from '../../components/navbar/Navbar';

const SubjectDetail = () => {
    const { eduTerm, eduYear, code } = useParams();
    const [subject, setSubject] = useState(null);

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

        fetchSubject();
    }, [eduTerm, eduYear, code]);

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    {subject && (
                        <Grid item xs={12}>
                            <Card sx={{ marginBottom: 2, backgroundColor: '#f5f5f5' }}>
                                <CardContent>
                                    <Typography variant="h6">
                                        Subject Code: {subject.subjectCode}
                                    </Typography>
                                    <Typography variant="body1">
                                        English Name: {subject.shortNameEng}
                                    </Typography>
                                    <Typography variant="body1">
                                        Thai Name: {subject.subjectNameThai}
                                    </Typography>
                                    <Typography variant="body1">
                                        Credit: {subject.credit}
                                    </Typography>
                                    <Typography variant="body1">
                                        Section: {subject.section}
                                    </Typography>
                                    <Typography variant="body1">
                                        Campus: {subject.campusNameThai}
                                    </Typography>
                                    <Typography variant="body1">
                                        Faculty: {subject.facNameThai}
                                    </Typography>
                                    <Typography variant="body1">
                                        Department: {subject.deptNameThai}
                                    </Typography>
                                    <Typography variant="body1">
                                        Student Group: {subject.studentGroup}
                                    </Typography>
                                    <Typography variant="body1">
                                        Section Status: {subject.sectionStatus}
                                    </Typography>
                                    <Typography variant="body1">
                                        Lecturer: {subject.lecturerNameThai} {subject.lecturerSnameThai}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2 }}
                                        component="a"
                                        href={`/review/${eduTerm}/${eduYear}/${code}`}
                                    >
                                        Review
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default SubjectDetail;
