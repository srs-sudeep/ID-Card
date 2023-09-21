import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoadingPage from "./components/LoadingPage";

// ----------------------------------------------------------------------

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
  
    if (loading) {
      return <LoadingPage />;
    }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
