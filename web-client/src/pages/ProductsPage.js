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
} from '../sections/@dashboard/products';
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
    // const hasVisitedBefore = sessionStorage.getItem('hasVisitedPage');
    // if (!hasVisitedBefore){
    menuList();
    //   setFirstVisit(false);
    //   sessionStorage.setItem('hasVisitedPage', 'true');
    // }

  }, []);

 
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
            <ProductSort />
          </Stack>
        </Stack>
        {/* <Grid container spacing={2}> */}
        {menu.map((day, index) => (
          <div key={index}>
            <ul>
              <Typography variant="h3" style={{color:'#2b2c30'}}>{day.name}</Typography>
              {day.meals.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <Typography
                    variant="h4"
                    my={'20px'}
                    style={{ backgroundColor: '#d0f2ff', padding: '0px 10px', color: '#04297a' }}
                  >
                    {meal.type}{' '}
                  </Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    {meal.items.map((item, itemIndex) => (
                      <ProductCard
                        name={item.name}
                        price={item.price}
                        category={item.category}
                        type={item.type}
                        time={meal.type}
                      />
                    ))}
                  </div>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        ))}
        {/* </Grid> */}

        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
