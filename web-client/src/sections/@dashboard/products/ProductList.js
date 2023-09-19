import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
// products: PropTypes.array.isRequired,
// };

export default function ProductList({ key, name, price, category, type }) {
return (
<Grid container spacing={3}>
{/* {products.map((product) => ( */}
<Grid item xs={12} sm={6} md={3}>
<ShopProductCard name={name} price={price} category = {category} type={type} />
</Grid>
{/* ))} */}
</Grid>
);
}