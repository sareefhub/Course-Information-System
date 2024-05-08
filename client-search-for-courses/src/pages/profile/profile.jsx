import React from 'react';
import { useStudentData } from '../../components/hooks/useStudentData';
import Navbar from '../../components/navbar/Navbar';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import './Profile.css';

function Profile() {
  const { studentData } = useStudentData(); 

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
                <Grid container spacing={2}>
                    {studentData && (
                        <Grid item xs={12}>
                            <Card sx={{ marginBottom: 2, marginTop: 2, backgroundColor: '#e6f2ff', color: 'black' }} className='title-student'>
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography variant="h4" sx={{ marginBottom: 0.5, fontWeight: 'bold' }}>
                                     ประวัตินักศึกษา
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                      รหัสนักศึกษา
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                      {studentData.studentId}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        ชื่อ
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                      {studentData.titleNameThai} {studentData.studNameThai} {studentData.studSnameThai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        ชั้นปีที่
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                      {studentData.yearStatus}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        กำลังศึกษา
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                      {studentData.majorNameThai} {studentData.facNameThai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        ระดับ
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                      {studentData.studyLevelName} {studentData.studyTypeName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        วิทยาเขต
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1">
                                     {studentData.campusNameThai}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
    </div>
  );
}

export default Profile;
