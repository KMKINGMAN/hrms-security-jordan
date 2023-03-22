import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import { configrationdata } from './configration';
import { Login } from './redux/auth';
import { setEmployees } from './redux/employee';
import { addCompany, setCompanies } from "./redux/companies";
// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const employees = useSelector((state)=> state.employee);
  const companies = useSelector((state) => state.companies);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(configrationdata.token, {
          headers: {
            Authorization: token,
          },
        })
        .then(({ data: newData }) => {
          dispatch(Login(newData));
        })
        .catch(() => {
          console.log('invalid token');
          localStorage.removeItem('token');
        });
    } else {
      console.log('no token found');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(authData);
    axios.get(configrationdata.all_employee, { headers: {Authorization: token}})
          .then(({ data: employeeData })=> {
            console.log(employeeData)
            dispatch(setEmployees(employeeData))
          })
          .catch((error)=> {
            console.log("cannot get the base employees data")
          });
          axios.get(configrationdata.all_companies, { headers: { Authorization: token } })
          .then(({ data: companiesData })=> {
            console.log(companiesData)
            dispatch(setCompanies(companiesData))
          })
          .catch((error)=> {
            console.log("cannot get companies data")
          });
          axios.get(configrationdata.company_data, { headers: { Authorization: token } })
          .then(({data: RootData})=> {
            console.log(RootData);
            dispatch(addCompany(RootData));
          })
          .catch((error)=> {
            console.log("cannot get main company data")
          })
  }, [authData]);
  useEffect(()=> {
    console.log(employees.employee.length)
  }, [employees.employee]);
  useEffect(()=> {
    console.log(companies.companies)
  }, [companies.companies]);
  
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router login={authData.login} />
    </ThemeProvider>
  );
}
