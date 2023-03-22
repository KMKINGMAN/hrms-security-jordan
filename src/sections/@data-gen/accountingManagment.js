const accountRows = (data) => {
    return data.map((employee)=> {
        return {
          name: `${employee.name.first} ${employee.name.father} ${employee.name.grandfather} ${employee.name.family}`,
          username: `${employee.web_user.username}`,
          pwd: `${employee.web_user.pwd}`,
          id: `${employee.web_user._id}`,
          type: `${employee.web_user.type}`
        }
      });
};
const accountExcelData = (data) => {
    return data.map((key)=> {
        return {
          "اسم صاحب الحساب": key.name,
          "اسم المستخدم": key.username,
          "كلمة المرور": key.pwd,
          "نوع الحساب": key.type
        }
      })
}
export {
    accountRows,
    accountExcelData
}
/**
{
            formik.values = {
              "معلومات اساسية": "",
              "firstName": "محمد",
              "fatherName": "رأفت",
              "grandFatherName": "تيسير",
              "familyName": "كركار",
              "DOB": "2003-12-27T22:00:00.000Z",
              "motherName": "لمياء",
              "bornPlace": "الرصيفة",
              "nationility": "أردني",
              "relationStatus": "أعزب",
              "religeon": "إسلام",
              "IDNumber": "5468216459",
              "mainPhoneNumber": "0792914245",
              "otherPhoneNumber": "0797252408",
              "latestAcademic": "بكالوريوس",
              "acadmicDegress": "جيد جدا",
              "studyPlace": "جامعة العلوم التتطبيقية",
              "LanguagesKnowlage": "ممتاز",
              "الخدمة العكسرية": "",
              "military": false,
              "militaryID": "",
              "militaryRole": "",
              "اسباقية العمل": "",
              "workInOtherCompany": false,
              "workPlace": "",
              "otherCompanySalary": 0,
              "leaveReason": "",
              "معلومات العمل الحالي": "",
              "salary": "500",
              "website_account_type": "مسؤول",
              "time_goup": "دوام كامل",
              "company_name": "640250b5ae77c6afdfc9e249"
            }
          }
 */