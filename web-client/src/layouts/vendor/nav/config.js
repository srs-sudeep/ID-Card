// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/vendor/dashboard/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Live Service',
    path: '/vendor/liveService',
    icon: icon('ic_cart'),
  },
  {
    title: 'History',
    path: '/vendor/history',
    icon: icon('ic_user'),
  },
  {
    title: 'Student List',
    path: '/vendor/studentList',
    icon: icon('ic_blog'),
  },
  {
    title: 'Menu',
    path: '/vendor/menu',
    icon: icon('ic_cart'),
  },
  {
    title: 'Profile',
    path: '/vendor/profile',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
