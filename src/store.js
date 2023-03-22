import { configureStore, createSlice } from '@reduxjs/toolkit'
import mainAuth from './redux/auth'
import companies from './redux/companies'
import employee from './redux/employee'

export default configureStore({
  reducer: {
    auth: mainAuth,
    employee,
    companies
  }
})