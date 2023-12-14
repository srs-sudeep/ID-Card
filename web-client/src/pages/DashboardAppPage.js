import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  return daysOfWeek[currentDayIndex];
}
export default function DashboardAppPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [txn, setTxn] = useState([]); // State to store user info
  const [name, setName] = useState('');
  const [messName, setMessName] = useState('');
  const [remainingAmount, setRemain] = useState('');
  const [totalAmount, setTotal] = useState('');
  const [day, setday] = useState(getCurrentDay());
  const [menu, setMenu] = useState([]);
  const [todaymenu, updtmenu] = useState([]);
  const [timeline, setTimeline] = useState([]);


  // function formatNumber(num) {
  //   if (num >= 1000 && num < 1000000) {
  //     return `${(num / 1000)}k`;
  //   }
  //   if (num >= 1000000) {
  //     return `${(num / 1000000)}M`;
  //   }
  //   return num.toString();
  // }
  // const formattedTotalAmount = formatNumber(totalAmount);

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
    async function fetchData() {
      try {

        const response = await axios.post("http://localhost:5000/api/auth/verify",{xhrFields:{withCredentials:true}},{ withCredentials: true });
        const user = response.data.userInfo;

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
        // console.log(trxnHis);


        const menu = await axios.post('http://localhost:5000/api/menu/list', {
          xhrFields: {
            withCredentials: true,
          },
        }, {withCredentials: true});
        setMenu(menu.data);
        // console.log(menu.data);



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
  useEffect(() => {
    menu.forEach((d, index) => {
      if (d.name === day) {
        updtmenu(d.meals);
      }
    });
  }, [menu])
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
  const basicConsumed = (txn.reduce((count, item) => (item.amount === '0' ? count + 1 : count), 0)) * 48;
  function countDays() {
    // Define the start date (August 2nd)
    const startDate = new Date('2023-08-02');
    // Get the current date
    const currentDate = new Date();
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - startDate;
    // Calculate the number of days by dividing milliseconds by (1000ms * 60s * 60min * 24h)
    const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return numberOfDays;
  }
  const basicTotal = countDays() * 96;
  // Convert the sumsByDate object into an array of objects with date and sum
  const sumsArray = Object.keys(sumsByDate).map(date => sumsByDate[date]);
  const amtSum = txn.reduce((sum, item) => sum + parseFloat(item.amount), 0);


  useEffect(() => {
    // Function to format the date in the required format
    const formatDate = (date) => {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return new Date(date).toLocaleDateString('en-US', options);
    };

    // Function to update the timeline state
    const updateTimeline = () => {
      const updatedTimeline = txn.map((transaction) => ({
        category: transaction.category,
        time: formatDate(transaction.trns_date),
      }));
      setTimeline(updatedTimeline);
    };

    // Call the updateTimeline function
    updateTimeline();
  }, [txn]);
  // console.log(txn);
  // console.log(timeline);
  const amount = `${totalAmount - amtSum}/${totalAmount}`;
  return (
    <>
      <Helmet>
        <title> Dashboard | IIT Bhilai Dining Page </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ mb: 5 }}>
          Welcome! {name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Registered Mess" total={messName} icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Up Coming Meal" total={meal} color="info" icon={'ant-design:interaction-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Add On Status" total={amount} color="warning" icon={'ant-design:money-collect-twotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Basic Status" total="9000/30000" color="error" icon={'ant-design:bank-twotone'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Daily Consumption"
              subheader="Last 7 Days"
              chartData={[
                {
                  name: 'Basic Consumed',
                  type: 'bar',
                  fill: 'solid',
                  data: [48, 96, 0, 48, 0, 96, 48],
                },
                {
                  name: 'Add-On Consumed',
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
                { label: 'Basic Consumed', value: 9000 },
                { label: 'Basic Wasted', value: 3000 },
                { label: 'Add-On Consumed', value: 4500 },
                { label: 'Add-On Left', value: totalAmount - amtSum },
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
              list={timeline
                .filter((item) => {
                  // Check if the transaction date belongs to the current date
                  const currentDate = new Date();
                  const transactionDate = new Date(item.time);
                  return (
                    currentDate.getDate() === transactionDate.getDate() &&
                    currentDate.getMonth() === transactionDate.getMonth() &&
                    currentDate.getFullYear() === transactionDate.getFullYear()
                  );
                })
                .map((item, index) => ({
                  id: item.id,
                  title: item.category, // Set title to the 'category' from timeline
                  type: `order${index + 1}`,
                  time: item.time,
                }))
              }
            />
            {/* <AppOrderTimeline
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
              /> */}
            {/* <AppOrderTimeline title="Current Day Transactions" list={formattedTransactions} /> */}
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
