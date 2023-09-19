import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { Container, Stack, Typography, Grid } from '@mui/material';
// import {  } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar, ProductCard } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
// import ShopProductCard from '../sections';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  // let menu = null;
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
            "messName": mess,
          },
        });
        // console.log("response", response);
        const data = response.data;
        // localStorage.setItem('menu', data);
        // console.log(data[0].meals[0].type);
        setMenu(data);


      }
      catch (error) {
        console.log(error);
      }
    }
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
    //     meal.items.forEach((item) => {
    //       console.log(`Item Name: ${item.name}, Price: ${item.price}`);
    //     });
    //   });
    // });

  }, []);


  // menu = localStorage.getItem('menu');
  // console.log(menu);

  // const meals = menu[0].meals;

  // const menudata = menu[0].meals
  // console.log(menu[0].meals[0]);
  return (
    <>

      <Helmet>
        <title>Products | IIT Bhilai Dinning System</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Menu
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        {/* <Grid container spacing={2}> */}
        {menu.map((day, index) => (
          <div key={index}>
            <ul>
              <Typography variant="h1">
                {day.name}
              </Typography>
              {day.meals.map((meal, mealIndex) => (

                <div key={mealIndex}>
                  <Grid container spacing={4}> {/* Adjust spacing if needed */}
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
        ))
        }
        {/* </Grid> */}

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
