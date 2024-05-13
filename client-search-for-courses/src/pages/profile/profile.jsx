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
              <Grid item xs={3}>
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
              <Grid item xs={9} sx={{ position: 'relative' }}>
                <Box sx={{ width: 150, height: 150, overflow: 'hidden', position: 'absolute', top: 0, right: 0, borderRadius: '50%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                  <Avatar
                    alt="Student"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&q=80"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Button variant="outlined" sx={{ mt: 2 }}>
              แก้ไข
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
