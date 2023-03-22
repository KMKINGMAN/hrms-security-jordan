import { createSlice } from '@reduxjs/toolkit'

export const companiesData = createSlice({
    name: 'companies',
    initialState: {
      companies: [],
    },
    reducers: {
      removeCompany: (init, action) => {
        const id = action.payload;
        init.companies = init.companies.filter(companies => companies._id !== id);
      },
      addCompany: (init, action) => {
        const companies = action.payload;
        init.companies.push(companies);
      },
      updateCompany: (init, action) => {
        const updateCompany = action.payload;
        init.companies = init.companies.map((company) => {
            return company._id === updateCompany._id? updateCompany : company
        });
      },
      setCompanies: (init, action)=> {
        init.companies = action.payload
      }
    }
});

export const { removeCompany, addCompany, updateCompany, setCompanies } = companiesData.actions;

export default companiesData.reducer