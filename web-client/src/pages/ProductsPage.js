import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Stack, Typography, Grid } from '@mui/material';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductCard,
} from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

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

  useEffect(()=>{
      menu.forEach((d, index) => {
      if (d.name === day) {
        updtmenu(d.meals);
      }
    });
  },[menu, day])

  return (
    <>
      <Helmet>
        <title>Products | IIT Bhilai Dinning System</title>
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
