// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Student Details',
    path: '/admin/studentDetails',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mess Details',
    path: '/admin/messDetails',
    icon: icon('ic_user'),
  }
  // {
  //   title: 'Student List',
  //   path: '/vendorr/dashboard/studentList',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Contact Us',
  //   path: '/dashboard/contactUs',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Profile',
  //   path: '/vendor/dashboard/profile',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
