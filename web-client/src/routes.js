import { Navigate, useRoutes, useNavigate,} from 'react-router-dom';
import { useEffect } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ContactUs from './pages/ContactUs';
import Settings from './pages/Settings';
import Payment from './pages/Payment';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
// import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('jwtToken');
    if(!token){
      navigate('/login', {replace: true});
    }
  },[navigate]);
  const routes = useRoutes([
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
        { path: 'settings', element: <Settings /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      // element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />},
        {path: '', element: <LoginPage/>},
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
