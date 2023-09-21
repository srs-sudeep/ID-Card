import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Stack, Typography, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductCard,
} from '../sections/@dashboard/products';

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  return daysOfWeek[currentDayIndex];
}
export default function ProductsPage() {
  const [day, setday] = useState(getCurrentDay());
  const [openFilter, setOpenFilter] = useState(false);
  const [menu, setMenu] = useState([]);
  const [todaymenu, updtmenu] = useState([]);
  const [firstVisit, setFirstVisit] = useState(true);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  async function menuList() {
    try {
      const mess = localStorage.getItem('mess');
      const response = await axios.get('http://localhost:5000/api/menu/list', {
        headers: {
          messName: mess,
        },
      });
      const data = response.data;
      setMenu(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    menuList();
  }, []);

  useEffect(() => {
    menu.forEach((d, index) => {
      if (d.name === day) {
        updtmenu(d.meals);
      }
    });
  }, [menu, day]);

  return (
    <>
      <Helmet>
        <title>Menu Page | IIT Bhilai Dinning System</title>
      </Helmet>

      <Container>
        <Typography variant="h1" sx={{ mb: 0 }}>
          Menu
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            <ProductSort setDay={setday} />
          </Stack>
        </Stack>
        {/* <Grid container spacing={2}> */}
        {/* {menu.map((day, index) => (
          <div key={index}>
            <ul> */}
        <Typography variant="h2" style={{ color: '#2b2c30' }}>
          {day}
        </Typography>
        {/* {todaymenu.map((meal, mealIndex) => ( */}
        {/* <div key={mealIndex}> */}
        {todaymenu.map((item, itemIndex) => (
          <>
            <Accordion
              style={{
                backgroundColor: 'white',
                marginTop: '20px',
                padding: '0px 10px',
                color: '#313131',
                borderRadius: '10px',
              }}
              TransitionProps={{ unmountOnExit: false }} 
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h4">{item.type}</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          </>
        ))}
        {/* </ul> */}
        {/* </div> */}
        {/* ))} */}
        {/* </Grid> */}

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
