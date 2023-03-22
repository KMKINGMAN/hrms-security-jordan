// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'لوحة التحكم',
    path: '/dashboard/main',
    icon: icon('ic_analytics'),
  },
  {
    title: 'الموظفين',
    path: '/dashboard/employee',
    icon: icon('ic_user'),
  },
  {
    title: 'الشركات',
    path: '/dashboard/companys',
    icon: <Iconify icon="fluent-mdl2:company-directory"/>,
  },
  {
    title: 'الحضور و الغياب',
    path: '/dashboard/attendance',
    icon: <Iconify icon="icon-park:check-correct"/>,
  },
  {
    title: 'ادارة الحسابات',
    path: '/dashboard/accounting',
    icon: <Iconify icon="material-symbols:settings-account-box-sharp"/>,
  },
  {
    title: 'ادارة الرواتب',
    path: '/dashboard/salaries',
    icon: <Iconify icon="game-icons:cash"/>,
  },
  {
    title: 'الخروج من النظام',
    path: '/dashboard/logout',
    icon: <Iconify icon="basil:logout-solid"/>,
  }
];

export default navConfig;
