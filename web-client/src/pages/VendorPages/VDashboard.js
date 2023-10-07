import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function VDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userId, setUser] = useState(null); // State to store user info
  const [name, setName] = useState('');
 
  useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await axios.post("http://localhost:5000/api/auth/verify", {
          xhrFields: {withCredentials: true}
        },
        {withCredentials: true});
        // If the response is successful, you can access the protected user data here
        const user = response.data.userInfo;
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.name);
        // localStorage.setItem('mess', user.mess);
        setName(user.name);


      } catch (error) {
        // Handle errors, such as token validation failure or network issues
        localStorage.clear();
        sessionStorage.clear();
        if (error.response && error.response.data && error.response.data.msg) {
          const errorMessage = error.response.data.msg;
          // Display the error message to the user (e.g., using an alert or on the UI)
          alert(errorMessage);
        } else {
          // Handle unexpected errors
          console.error(error);
          // If token validation fails or there's an error, navigate the user to the login page
        }
        navigate('/login', { replace: true });
      }
    }

    fetchData();
  }, [navigate]); // Empty dependency array, runs once on mount


  return (
    <>
      <Helmet>
        <title> Vendor Dashboard | IIT Bhilai Dining Page </title>
      </Helmet>

      <Container maxWidth="xl">

        <Typography variant="h2" sx={{ mb: 5 }}>
        Welcome! {name}
        </Typography>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Today's Menu
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Dosa" total="Breakfast" sx={{display:'none'}} icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sambar ;)" total={"Lunch"} color="info" sx={{display:'none'}} icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Maggie" total={"Snacks"} color="warning" sx={{display:'none'}} icon={'ant-design:money-collect-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Biryani" total={"Dinner"} color="error" sx={{display:'none'}} icon={'ant-design:bank-twotone'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              style={{width:'150%'}}
              title="Breakfast Stats"
              subheader="Previous 7 Days"
              chartLabels={[
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
              ]}
              chartData={[
                {
                  name: 'Basic',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                }
              ]}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              style={{width:'150%'}}
              title="Lunch Stats"
              subheader="Previous 7 Days"
              chartLabels={[
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
              ]}
              chartData={[
                {
                  name: 'Basic',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                  name: 'Add-On',
                  type: 'line',
                  fill: 'solid',
                  data: [44,  41, 55,  43, 21,20,67],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              style={{width:'150%'}}
              title="Snacks Stats"
              subheader="Previous 7 Days"
              chartLabels={[
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
              ]}
              chartData={[
                {
                  name: 'Basic',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              style={{width:'150%'}}
              title=" Dinner Stats"
              subheader="Previous 7 Days"
              chartLabels={[
                '01/01/2003',
                '01/02/2003',
                '01/03/2003',
                '01/04/2003',
                '01/05/2003',
                '01/06/2003',
                '01/07/2003',
              ]}
              chartData={[
                {
                  name: 'Basic',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                  name: 'Add-On',
                  type: 'line',
                  fill: 'solid',
                  data: [44,  41, 55,  43, 21,22,67],
                },
              ]}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Today's Dinning Chart"
              chartData={[
                // { label: 'Basic Consumed', value: 4344 },
                { label: 'Had Food', value: 5435 },
                { label: 'Left to have Food', value: 1443 },
                // { label: 'Add-On Consumed', value: 4443 },
                // { label: 'Add-On Left', value: 4443 },
              ]}
              chartColors={[
                theme.palette.info.main,
                theme.palette.warning.main
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}



          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
