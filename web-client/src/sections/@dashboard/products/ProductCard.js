import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview ,  ColorSinglePicker} from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ name, price, category, type, time }) {
  // const { names, cover, prices, colors, status, priceSale } = product;
  // console.log(category);
  const col = type === "Veg" ?  ["green"] :["red"] ;
  return (
    <Card  sx={{ minWidth: 275 ,marginBottom:10}}>
      {/* <Typography variant="subtitle2" noWrap>
            {name}
          </Typography> */}
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && ( */}
          <Label
            variant="filled"
            color={category === "Basic" ? "info" : "error"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Label>
        {/* )} */}
        <StyledProductImg alt={name} src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={col} />
          {/* <ColorSinglePicker color={"red"}/> */}
          <Typography variant="subtitle1">
            {time}
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {price && fCurrency(price)} */}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
