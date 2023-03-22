import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { Login } from '../../../redux/auth';
import { configrationdata } from '../../../configration';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const auth = useSelector((select) => select.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
  };
  const onSubmit = (value) => {
    console.log(value);
    axios.post(configrationdata.login, { username: value.username, pwd: value.password })
    .then(({ data })=> {
      dispatch(Login(data));
      localStorage.setItem("token", data.token);
      navigate('/', { replace: true });
      console.log(auth);
    }).catch(error=> {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);    
    })
  }
  return (
    <>

      <Formik
        onSubmit={onSubmit}
        initialValues={
          {
            username: "",
            password: ""
          }
        }
        validationSchema={
          yup.object().shape({
            username: yup.string().required("لا يمكنك ترك الحقل فارغا"),
            password: yup.string().required("لا يمكنك ترك الحقل فارغا")
          })
        }
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Stack spacing={3}>
            <form onSubmit={handleSubmit}>
              <TextField
              fullWidth sx={{
                mb: 5
              }}
                name="username"
                label="اسم المستخدم"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <TextField
              fullWidth
                name="password"
                label="كلمة المرور"
                type={showPassword ? 'text' : 'password'}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'line-md:lightbulb' : 'line-md:lightbulb-off'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Divider fullWidth/>
              </Stack>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                تسجيل الدخول
              </LoadingButton>
            </form>
          </Stack>
        )}
      </Formik>
    </>
  );
}
