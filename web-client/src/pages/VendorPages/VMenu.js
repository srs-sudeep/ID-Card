import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Grid } from '@mui/material';
// import {  } from '@mui/material';
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductCard,
} from '../../sections/@dashboard/products';
// import ShopProductCard from '../sections';

// ----------------------------------------------------------------------
function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // Returns a number (0 for Sunday, 1 for Monday, etc.)
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
        setMenu(data);
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(menu);

    // const hasVisitedBefore = sessionStorage.getItem('hasVisitedPage');
    // if (!hasVisitedBefore){
    menuList();

    //   setFirstVisit(false);
    //   sessionStorage.setItem('hasVisitedPage', 'true');
    // }

    // menu.forEach((day) => {
    //   console.log(`Day Name: ${day.name}`);

    //   // Iterate through the meals array for each document
    //   day.meals.forEach((meal) => {
    //     console.log(`Meal Type: ${meal.type}`);

    //     // Iterate through the items array for each meal
    menu.forEach((d, index) => {
      // console.log(d);
      // console.log(day);
      // console.log(d.name);
      if (d.name === day) {
        updtmenu(d.meals);
        console.log('asdfadsf');
      }
    });
    //     meal.items.forEach((item) => {
    //       console.log(`Item Name: ${item.name}, Price: ${item.price}`);
    //     });
    //   });
    // });
  }, []);

  // menu.forEach((d) => {
  //   if (d.name === day) {
  //     updtmenu(d.meals);
  //   }
  // });

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

  console.log(todaymenu);

  // menu = localStorage.getItem('menu');
  // console.log(menu);

  // const meals = menu[0].meals;

  console.log(todaymenu);

  // const menudata = menu[0].meals
  // console.log(menu[0].meals[0]);
  return (
    <>
      <Helmet>
        <title> Menu | IIT Bhilai Dinning System</title>
      </Helmet>

      <Container>
        <Typography variant="h2" sx={{ mb: 5 }}>
          Menu
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
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
        {/* </ul> */}
        {/* </div> */}
        {/* ))} */}
        {/* </Grid> */}

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
