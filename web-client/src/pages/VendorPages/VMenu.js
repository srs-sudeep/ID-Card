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
} from '../../sections/@dashboard/products';
import PRODUCTS from '../../_mock/products';

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); 
  return daysOfWeek[currentDayIndex];
}
export default function ProductsPage() {


  const [day , setday] = useState(getCurrentDay());
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
      const mess = localStorage.getItem('name');
      const response = await axios.get('http://localhost:5000/api/menu/list', {
        headers: {
          messName: mess,
        },
      });
      const data = response.data;
      console.log(data);

      setMenu(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(menu);
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
            <ProductSort setDay={setday} />
          </Stack>
        </Stack>
              <Typography variant="h1">{day}</Typography>
                  {todaymenu.map((item, itemIndex) => (

                    <div style={{display:'flex', flexWrap:'wrap', gap: '30px'}}>
                    <h1>{item.type}</h1>
                   { item.items.map((i, index) => (
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
                  ))}
      </Container>
    </>
  );
}
