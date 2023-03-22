import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import EmployeePage from './pages/EmployeesPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/Companies';
import DashboardAppPage from './pages/DashboardMainPage';
import AccountingPage from './pages/Accounting';
// ----------------------------------------------------------------------

export default function Router({ login }) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: login ? <Navigate to="/dashboard/main" />: <Navigate to="/login" />, index: true },
        { path: 'main', element:  login? <DashboardAppPage />: <Navigate to="/login" /> },
        { path: 'employee', element: login? <EmployeePage />: <Navigate to="/login" /> },
        { path: 'companys', element:  login? <ProductsPage />: <Navigate to="/login" /> },
        { path: 'attendance', element:  login? <ProductsPage />: <Navigate to="/login" /> },
        { path: 'accounting', element:  login? <AccountingPage />: <Navigate to="/login" /> },
        { path: 'salaries', element:  login? <ProductsPage />: <Navigate to="/login" /> },
        { path: 'logout', },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: login? <Navigate to="/dashboard/main" /> : <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: login? <Navigate to="/dashboard/main" />: <Navigate to="/login" />, index: true },
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
