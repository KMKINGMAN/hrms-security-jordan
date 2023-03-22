import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();
  const { employee } = useSelector((state)=> state.employee);
  const { companies } = useSelector((state) => state.companies);
  const Static = [
    {
      title: "الموضفين",
      total: employee.length,
      icon: "ic:baseline-groups",
      color: "info"
    },
    {
      title: "الشركات",
      total: companies.length,
      icon: "line-md:uploading-loop",
      color: "warning"
    },
    {
      title: "الادارة",
      total: employee.map(emp=> emp.web_user).filter(user=> user.type === 1).length,
      icon: "line-md:account-add",
      color: "error"
    },
    {
      title: "الحسابات",
      total: employee.map(emp=> emp.web_user).length,
      color: "info",
      icon: "ant-design:team-outlined"
    }
  ];
  useEffect(()=> {
    console.log(companies, employee)
  }, [employee, companies]);
  return (
    <>
      <Helmet>
        <title> لوحة التحكم </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          اهلا بك في لوحة المعلومات
        </Typography>

        <Grid container spacing={3}>

          {
            Static.map((data, index)=> {
              return <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title={data.title} total={data.total} color={data.color} icon={data.icon} key={index} />
              </Grid>
            })
          }

        </Grid>
      </Container>
    </>
  );
}
