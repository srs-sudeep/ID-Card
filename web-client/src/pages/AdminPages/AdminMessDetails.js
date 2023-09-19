import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
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
// ----------------------------------------------------------------------

export default function AdminMessDetails() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openFilter, setOpenFilter] = useState(false);
  const [menu, setMenu] = useState([]);

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
  }, []);

  return (
    <>
      <Helmet>
        <title> Contact Page | IIT Bhilai Dinning System </title>
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
              <Typography variant="h3" align="center" mt={5} mb={2}>
                Menu
              </Typography>
              {/* <hr /> */}

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
                  <ProductSort />
                </Stack>
              </Stack>
              {menu.map((day, index) => (
                <div key={index}>
                  <ul>
                    <Typography variant="h4">{day.name}</Typography>
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex}>
                        <Grid container spacing={'70px'}>
                          {' '}
                          {/* Adjust spacing if needed */}
                          {meal.items.map((item, itemIndex) => (
                            <Grid key={itemIndex} item xs={12} sm={4} md={4}>
                              <ProductCard
                                name={item.name}
                                price={item.price}
                                category={item.category}
                                type={item.type}
                                time={meal.type}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    ))}
                  </ul>
                </div>
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
              <Typography variant="h3" align="center" mt={5} mb={2}>
                Menu
              </Typography>
              {/* <hr /> */}

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
                  <ProductSort />
                </Stack>
              </Stack>
              {menu.map((day, index) => (
                <div key={index}>
                  <ul>
                    <Typography variant="h4">{day.name}</Typography>
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex}>
                        <Grid container spacing={'70px'}>
                          {' '}
                          {/* Adjust spacing if needed */}
                          {meal.items.map((item, itemIndex) => (
                            <Grid key={itemIndex} item xs={12} sm={4} md={4}>
                              <ProductCard
                                name={item.name}
                                price={item.price}
                                category={item.category}
                                type={item.type}
                                time={meal.type}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    ))}
                  </ul>
                </div>
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
              <Typography variant="h3" align="center" mt={5} mb={2}>
                Menu
              </Typography>
              {/* <hr /> */}

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
                  <ProductSort />
                </Stack>
              </Stack>
              {menu.map((day, index) => (
                <div key={index}>
                  <ul>
                    <Typography variant="h4">{day.name}</Typography>
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex}>
                        <Grid container spacing={'90px'}>
                          {' '}
                          {/* Adjust spacing if needed */}
                          {meal.items.map((item, itemIndex) => (
                            <Grid key={itemIndex} item xs={12} sm={4} md={4}>
                              <ProductCard
                                name={item.name}
                                price={item.price}
                                category={item.category}
                                type={item.type}
                                time={meal.type}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </CustomTabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
}
