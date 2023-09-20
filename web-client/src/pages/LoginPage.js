import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <div>
      <Helmet>
        <title> Login | IIT Bhilai Dining System </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            // width: '100px', // Adjust the width to your desired size
            // height: '100px', // Adjust the height to your desired size
          }}
        />

        {mdUp && (
          <StyledSection
            style={{
              backgroundImage: `url('/assets/images/IMG_3687.jpg')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                height: '100vh',
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
              }}
            >
              <Typography variant="h3" sx={{ px: 5, mt: 12, mb: 3, color: 'white', textAlign: 'center' }}>
                Welcome to IIT Bhilai Mess System
              </Typography>
              <div style={{ marginTop: '-60px', padding: '50px' }}>
                <img src="/assets/images/IMG_3687.jpg" alt="login" style={{ borderRadius: '5%', height: '260px' }} />
              </div>
            </div>
          </StyledSection>
        )}

        <Container maxWidth="100%">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Pakadarpanalaya
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {/* Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link> */}
            </Typography>

            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}
            {/* 
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </div>
  );
}
