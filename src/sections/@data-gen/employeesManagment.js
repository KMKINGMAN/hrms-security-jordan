const employeeRows = (data) => {
    return data.map((employee)=> {
        return {
          name: `${employee.name.first} ${employee.name.father} ${employee.name.grandfather} ${employee.name.family}`,
          mother: `${employee.name.mother}`,
          DOB: new Date(employee.DOB),
          bornPlace: employee.bornPlace,
          id: employee._id,
          religion: employee.religion,
          nationality: employee.nationality,
          relationStatus: employee.relationStatus,
          IDNumber: employee.IDNumber,
          mainPhone: employee.phone.main,
          otherPhone: employee.phone.other,
          edu: `${employee.edu.level} | ${employee.edu.degrees} | ${employee.edu.place}`,
          languageKnowlage: employee.languageKnowlage,
          military: `${employee.military.join ? `${employee.military.role} | ${employee.military.ID}` : "غير مسجل" }`,
          otherCompany: `${employee.workBGL.worked? `${employee.workBGL.place} | ${employee.workBGL.salary}`: `غير مسجل`}`,
          jobTitle: `${employee.work.job_title}`
        }
      });
};
const employeeExcelData = (data) => {
    return data.map((key)=> {
        return {
          "الاسم": key.name,
          "المسمى الوضيفي": key.jobTitle,
          "اسم الام": key.mother,
          "رقم الهوية": key.IDNumber,
          "تاريخ الميلاد": key.DOB,
          "مكان الولادة": key.bornPlace,
          "الديانة": key.religion,
          "الجنسية": key.nationality,
          "الحالة الاجتماعية": key.relationStatus,
          "هاتف الاساسي": key.mainPhone,
          "هاتف ثانوي": key.otherPhone,
          "المستوى التعليمي": key.edu,
          "درجة معرفة اللغات": key.languageKnowlage,
          "الخدمة العسكرية": key.military,
          "العمل بالشركات الاخرى": key.otherCompany,

        }
      })
}
export {
    employeeRows,
    employeeExcelData
}