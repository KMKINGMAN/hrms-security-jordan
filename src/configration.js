// import { config } from "dotenv";
// config();
const base = "http://localhost:4444"
/* eslint-disable camelcase */
export const configrationdata = {
    login: `${base}/auth/login`,
    all_employee: `${base}/employee/all`,
    create_employee: `${base}/employee/create`,
    employee_profile: (employee_id)=> {
        return `${base}/employee/${employee_id}/profile`
    },
    employee_delete: (employee_id = "")=> {
        return `${base}/employee/${employee_id}/remove`
    },
    employee_update: (employee_id = "")=> {
        return `${base}/employee/${employee_id}/update`
    },
    employee_attendance: (employee_id = "")=> {
        return `${base}/employee/${employee_id}/attendance`
    },
    token: `${base}/auth/status`,
    all_companies: `${base}/companies/all`,
    company_data: `${base}/root/data`
}