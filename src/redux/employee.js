import { createSlice } from '@reduxjs/toolkit'

export const employeeData = createSlice({
    name: 'employee',
    initialState: {
      employee: [],
    },
    reducers: {
      removeEmployee: (init, action) => {
        const id = action.payload;
        init.employee = init.employee.filter(employee => employee._id !== id);
      },
      addEmployee: (init, action) => {
        const employee = action.payload;
        init.employee.push(employee);
      },
      updateEmployee: (init, action) => {
        const updatedEmployee = action.payload;
        init.employee = init.employee.map((employee) => {
          return employee._id === updatedEmployee._id? updatedEmployee : employee;
          
        });
      },
      setEmployees: (init, action)=> {
        init.employee = action.payload
      }
    }
});

export const { removeEmployee, addEmployee, updateEmployee, setEmployees } = employeeData.actions;

export default employeeData.reducer