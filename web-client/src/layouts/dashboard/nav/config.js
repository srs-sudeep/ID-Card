// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'History',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Menu',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Payment',
    path: '/dashboard/payment',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Contact Us',
    path: '/dashboard/contactUs',
    icon: icon('ic_blog'),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
