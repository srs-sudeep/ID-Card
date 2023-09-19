import axios from 'axios';
import { Navigate, useRoutes, useNavigate, } from 'react-router-dom';
import { useEffect } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import VDashboard from './pages/VendorPages/VDashboard';
import VProfile from './pages/VendorPages/VProfile';
// import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
    async function validation() {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/validation", {
          headers: {
            "x-auth-token": token, // Pass the JWT token in the request header
          },
        });
        // if(!response.status==200)
        // navigate('/login', { replace: true });

      }
      catch(error){
        if (error.response && error.response.data && error.response.data.msg) {
          const errorMessage = error.response.data.msg;
          // Display the error message to the user (e.g., using an alert or on the UI)
          alert(errorMessage);
        } else {
          // Handle unexpected errors
          console.error(error);
          // If token validation fails or there's an error, navigate the user to the login page
        }
        navigate('/login', { replace: true });
      }
    }
    if(!window.location.pathname === '/login')
      validation();
  }, [navigate]);
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: '', element: <DashboardAppPage /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'contactUs', element: <ContactUs /> },
        { path: 'payment', element: <Payment /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      path: '/vendor/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/vendor/dashboard" /> },
        { path: '', element: <VDashboard /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      path: '/vendor/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/vendor/dashboard" /> },
        { path: '', element: <VDashboard /> },
        { path: 'profile', element: <VProfile /> },
      ],
    },
    {
      // element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" /> },
        { path: '', element: <LoginPage /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
