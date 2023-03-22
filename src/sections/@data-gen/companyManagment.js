const companyRows = (data) => {
    return data.map((company)=> {
        return {
            id: `${company._id}`,
            name: `${company.name}`,
            location: `${company.location}`,
            employees: `${company.employees.length}`
        }
      });
};
const companyExcelData = (data) => {
    return data.map((key)=> {
        return {
            "اسم الشركة": key.name,
            "احداثيات الشركة": key.location,
            "عدد الموظفين": key.employees
        }
      })
}
export {
    companyRows,
    companyExcelData
}