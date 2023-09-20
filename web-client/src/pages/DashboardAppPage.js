import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Iconify from '../components/iconify';
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

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  return daysOfWeek[currentDayIndex];
}

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userId, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messName, setMessName] = useState('');
  const [remainingAmount, setRemain] = useState('');
  const [totalAmount, setTotal] = useState('');
  const [day, setday] = useState(getCurrentDay());
  const [menu, setMenu] = useState([]);
  const [todaymenu, updtmenu] = useState([]);

  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) {
      return `${(num / 1000)}k`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000)}M`;
    }
    return num.toString();
  }
  const formattedTotalAmount = formatNumber(totalAmount);

  // async function menuList() {
  //   try {
  //     const mess = localStorage.getItem('mess');

  //     setMenu(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(menu);
  // useEffect(() => {
  //   menuList();
  // }, []);

  useEffect(() => {
    menu.forEach((d, index) => {
      if (d.name === day) {
        updtmenu(d.meals);
      }
    });
  }, [menu])

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


        const menu = await axios.get('http://localhost:5000/api/menu/list', {
          headers: {
            messName: user.mess,
          },
        });
        setMenu(menu.data);
        console.log(menu);



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
  const transformedData = todaymenu.map((menu, index) => ({
    id: menu._id, // Assuming _id is available in your database data
    title: menu.type, // Set title to the 'type' field in your schema
    description: menu.items.map((item) => item.name).join(', '), // Join all item names as the description
    image: `/assets/images/covers/cover_${index + 1}.avif`,
  }));

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
            <AppWidgetSummary title="Remainig Balance" total={remainingAmount} color="warning" icon={'ant-design:money-collect-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Balance" total={formattedTotalAmount} color="error" icon={'ant-design:bank-twotone'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Quick Glance"
              subheader="Previous 7 Days"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Add-On',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Basic',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4} >
            <AppCurrentVisits
              title="Dinning Chart"
              chartData={[
                { label: 'Basic Consumed', value: 4344 },
                { label: 'Basic Wasted', value: 5435 },
                { label: 'Add-On Consumed', value: 4443 },
                { label: 'Add-On Left', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.action.main,
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate
              title="Today's Menu"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            /> */}
            <AppNewsUpdate title="Today's Menu" list={transformedData} />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Meal Timeline"
              list={[...Array(4)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
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
