import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import trnxList from '../utils/trnxHistory';
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
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [txn, setTxn] = useState([]); // State to store user info
  const [name, setName] = useState('');
  const [messName, setMessName] = useState('');
  const [remainingAmount, setRemain] = useState('');
  const [totalAmount, setTotal] = useState('');

  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) {
      return `${(num / 1000)}k`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000)}M`;
    }
    return num.toString();
  }
  // const formattedRemainingAmount = formatNumber(remainingAmount);
  const formattedTotalAmount = formatNumber(totalAmount);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get the JWT token from local storage (or wherever you store it)
        const token = localStorage.getItem("jwtToken");
        const person = localStorage.getItem("person");
        // console.log('token', token,'person', person);
        if (!token) {
          navigate('/login', { replace: true });
        }
        // else{
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: {
            "x-auth-token": token,
            "person": person // Pass the JWT token in the request header
          },
        });

        const user = response.data.userInfo;
        if (person !== 'Student')
          navigate('/login', { replace: true });

        localStorage.setItem('email', user.email);
        localStorage.setItem('mess', user.mess);
        localStorage.setItem('name', user.name);
        localStorage.setItem('id', user.id);
        setName(user.name);
        setMessName(user.mess);
        setRemain(user.remaining_amount);
        setTotal(user.total_amount);
        const trxnHis = await trnxList(user.id);
        setTxn(trxnHis);
        console.log(trxnHis);



      } catch (error) {
        // Handle errors, such as token validation failure or network issues
        localStorage.clear();
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
  let meal = '';
  const currentHour = new Date().getHours();
  if (currentHour >= 10 && currentHour < 15)
    meal = 'Lunch';
  else if (currentHour >= 15 && currentHour < 18)
    meal = 'Snacks';
  else if (currentHour >= 18 && currentHour < 22)
    meal = 'Dinner';
  else
    meal = 'Breakfast';

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const isoSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0]; // Get only the date part
  const filteredData = txn.filter(item => {
    const trnsDate = new Date(item.trns_date).toISOString().split('T')[0]; // Get only the date part
    return trnsDate >= isoSevenDaysAgo && trnsDate <= new Date().toISOString().split('T')[0]; // Get only the date part
  });
  const sumsByDate = {};

  filteredData.forEach(item => {
    const trnsDate = new Date(item.trns_date).toISOString().split('T')[0]; // Get only the date part
  
    if (Object.prototype.hasOwnProperty.call(sumsByDate, trnsDate)) {
      sumsByDate[trnsDate] += parseFloat(item.amount); // Add the amount to the existing sum for the date
    } else {
      sumsByDate[trnsDate] = parseFloat(item.amount); // Initialize the sum for the date
    }
  });
  
  // Convert the sumsByDate object into an array of objects with date and sum
  const sumsArray = Object.keys(sumsByDate).map(date => sumsByDate[date]);
  const amtSum = txn.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  console.log(amtSum);
  return (
    <>
      <Helmet>
        <title> Dashboard | IIT Bhilai Dining Page </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome {name}.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Mess" total={messName} icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Up Coming Meal" total={meal} color="info" icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Remainig Balance" total={totalAmount-amtSum} color="warning" icon={'ant-design:money-collect-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Balance" total={formattedTotalAmount} color="error" icon={'ant-design:bank-twotone'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Add On"
              subheader="Last 7 Days"
              chartData={[
                // {
                //   name: '',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [],
                // },
                {
                  name: 'Add-On',
                  type: 'bar', // Change type to 'bar' for histogram
                  fill: 'solid',
                  data: sumsArray, // Replace with your histogram data
                },
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Dinning Chart"
              chartData={[
                { label: 'Basic Consumed', value: 4344 },
                { label: 'Basic Wasted', value: 5435 },
                { label: 'Add-On Consumed', value: amtSum },
                { label: 'Add-On Left', value: totalAmount-amtSum },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.action.main,
              ]}
            />
          </Grid>


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
