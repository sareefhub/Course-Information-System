import React from 'react';
import { useStudentData } from '../../components/hooks/useStudentData';
import Navbar from '../../components/navbar/Navbar';
import { Container, Typography, Card, CardContent, Grid, Button, Avatar, Box } from '@mui/material';
import './Profile.css';

function Profile() {
  const { studentData } = useStudentData(); 

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Card sx={{ marginBottom: 2, marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              ประวัตินักศึกษา
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={5}>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  รหัสนักศึกษา
                </Typography>
                <Typography variant="body1">
                  {studentData && studentData.studentId}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 2 }}>
                  ชื่อ
                </Typography>
                <Typography variant="body1">
                  {studentData && `${studentData.titleNameThai} ${studentData.studNameThai} ${studentData.studSnameThai}`}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 2 }}>
                  ชั้นปีที่
                </Typography>
                <Typography variant="body1">
                  {studentData && studentData.yearStatus}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 2 }}>
                  กำลังศึกษา
                </Typography>
                <Typography variant="body1">
                  {studentData && `${studentData.majorNameThai} ${studentData.facNameThai}`}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 2 }}>
                  ระดับ
                </Typography>
                <Typography variant="body1">
                  {studentData && `${studentData.studyLevelName} ${studentData.studyTypeName}`}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 2 }}>
                  วิทยาเขต
                </Typography>
                <Typography variant="body1">
                  {studentData && studentData.campusNameThai}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
