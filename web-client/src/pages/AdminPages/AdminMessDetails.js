import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Form, Input, TextArea } from 'semantic-ui-react';
// components
import Swal from 'sweetalert2';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductCard,
} from '../../sections/@dashboard/products';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
const SERVICE_ID = 'service_3k0ua7g';
const TEMPLATE_ID = 'template_5sw2wi9';
const USER_ID = 'D6DKJjcrvzaH6b4fU';

// ----------------------------------------------------------------------
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // Returns a number (0 for Sunday, 1 for Monday, etc.)
  return daysOfWeek[currentDayIndex];
}
// ----------------------------------------------------------------------

export default function AdminMessDetails() {
  const [value, setValue] = React.useState(0);
  const [day, setday] = useState(getCurrentDay());
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [menu, setMenu] = useState([]);
  const [todaymenu, updtmenu] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [firstVisit, setFirstVisit] = useState(true);
  useEffect(() => {
    async function menuList() {
      try {
        const mess = localStorage.getItem('mess');
        const response = await axios.get('http://localhost:5000/api/menu/list', {
          headers: {
            messName: mess,
          },
        });
        // console.log("response", response);
        const data = response.data;
        // localStorage.setItem('menu', data);
        // console.log(data[0].meals[0].type);
        setMenu(data);
      } catch (error) {
        console.log(error);
      }
    }
    menuList();
    menu.forEach((d, index) => {
      // console.log(d);
      // console.log(day);
      // console.log(d.name);
      if (d.name === day) {
        updtmenu(d.meals);
        console.log('asdfadsf');
      }
    });
  }, []);
  useEffect(() => {
    // console.log('hwllo');
    menu.forEach((d, index) => {
      // console.log(d);
      // console.log(day);
      // console.log(d.name);
      if (d.name === day) {
        updtmenu(d.meals);
        console.log('asdfadsf');
      }
    });
  }, [day]);
  return (
    <>
      <Helmet>
        <title> Mess Details | IIT Bhilai Dinning System </title>
      </Helmet>

      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '150%',
              mx: 'auto',

              p: 4,
              // border: '2px solid  #000000',
              borderRadius: '12px',
              boxShadow: 6,
              height: 'auto',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontSize: '16px' }} label="Kumar" {...a11yProps(0)} />
                <Tab style={{ fontSize: '16px' }} label="Galav" {...a11yProps(1)} />
                <Tab style={{ fontSize: '16px' }} label="Shree Sai" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Typography variant="h3" align="center" mt={2} mb={2}>
                Mess-Committee Details
              </Typography>
              <hr />
              <Typography variant="h5" align="left" mt={4} mb={1}>
                Himanshu Rana
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <Typography variant="h5" align="left" mb={1}>
                Himanshu Rana Singh
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              {/* <Container> */}
              <hr />
              <Typography variant="h2" sx={{ mb: 5 }}>
                Menu
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
              >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <ProductFilterSidebar
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  />
                  <ProductSort setDay={setday} />
                </Stack>
              </Stack>
              {/* <Grid container spacing={2}> */}
              {/* {menu.map((day, index) => (
          <div key={index}>
            <ul> */}
              <Typography variant="h3" style={{ color: '#2b2c30' }}>
                {day}
              </Typography>
              {/* {todaymenu.map((meal, mealIndex) => ( */}
              {/* <div key={mealIndex}> */}
              {todaymenu.map((item, itemIndex) => (
                <>
                  <Typography
                    variant="h4"
                    my={'20px'}
                    style={{ backgroundColor: '#d0f2ff', padding: '0px 10px', color: '#04297a' }}
                  >
                    {item.type}
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    {/* <br/> */}

                    {item.items.map((i, index) => (
                      <ProductCard
                        key={index}
                        name={i.name}
                        price={i.price}
                        category={i.category}
                        type={i.type}
                        time={item.type}
                      />
                    ))}
                  </div>
                  <hr />
                </>
              ))}
              {/* </Container> */}
            </CustomTabPanel>
            {/* ------------------------------------------------------------------------------------- */}
            <CustomTabPanel value={value} index={1}>
              <Typography variant="h3" align="center" mt={2} mb={2}>
                Mess-Committee Details
              </Typography>
              <hr />
              <Typography variant="h5" align="left" mt={4} mb={1}>
                Nishchay
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <Typography variant="h5" align="left" mb={1}>
                Nishant
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <hr />
              <Typography variant="h2" sx={{ mb: 5 }}>
                Menu
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
              >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <ProductFilterSidebar
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  />
                  <ProductSort setDay={setday} />
                </Stack>
              </Stack>
              {/* <Grid container spacing={2}> */}
              {/* {menu.map((day, index) => (
          <div key={index}>
            <ul> */}
              <Typography variant="h3" style={{ color: '#2b2c30' }}>
                {day}
              </Typography>
              {/* {todaymenu.map((meal, mealIndex) => ( */}
              {/* <div key={mealIndex}> */}
              {todaymenu.map((item, itemIndex) => (
                <>
                  <Typography
                    variant="h4"
                    my={'20px'}
                    style={{ backgroundColor: '#d0f2ff', padding: '0px 10px', color: '#04297a' }}
                  >
                    {item.type}
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    {/* <br/> */}

                    {item.items.map((i, index) => (
                      <ProductCard
                        key={index}
                        name={i.name}
                        price={i.price}
                        category={i.category}
                        type={i.type}
                        time={item.type}
                      />
                    ))}
                  </div>
                  <hr />
                </>
              ))}
            </CustomTabPanel>
            {/* -------------------------------------------------------------------------------------------- */}

            <CustomTabPanel value={value} index={2}>
              <Typography variant="h3" align="center" mt={2} mb={2}>
                Mess-Committee Details
              </Typography>
              <hr />
              <Typography variant="h5" align="left" mt={4} mb={1}>
                SRS
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <Typography variant="h5" align="left" mb={1}>
                Dubey
              </Typography>
              <Typography subtitle1="h6" align="left" mb={2}>
                +91-92345 67845
              </Typography>
              <hr />
              <Typography variant="h2" sx={{ mb: 5 }}>
                Menu
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
              >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <ProductFilterSidebar
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  />
                  <ProductSort setDay={setday} />
                </Stack>
              </Stack>
              {/* <Grid container spacing={2}> */}
              {/* {menu.map((day, index) => (
          <div key={index}>
            <ul> */}
              <Typography variant="h3" style={{ color: '#2b2c30' }}>
                {day}
              </Typography>
              {/* {todaymenu.map((meal, mealIndex) => ( */}
              {/* <div key={mealIndex}> */}
              {todaymenu.map((item, itemIndex) => (
                <>
                  <Typography
                    variant="h4"
                    my={'20px'}
                    style={{ backgroundColor: '#d0f2ff', padding: '0px 10px', color: '#04297a' }}
                  >
                    {item.type}
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    {/* <br/> */}

                    {item.items.map((i, index) => (
                      <ProductCard
                        key={index}
                        name={i.name}
                        price={i.price}
                        category={i.category}
                        type={i.type}
                        time={item.type}
                      />
                    ))}
                  </div>
                  <hr />
                </>
              ))}
            </CustomTabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
}
