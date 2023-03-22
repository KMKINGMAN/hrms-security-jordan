import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import dayjs from "dayjs";
import axios from "axios";
import { Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Divider, useMediaQuery, MenuItem, FormControl, Select, InputLabel, FormHelperText, Chip } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { eduDegrees, eduLevels, JordanianCitys, MilitaryRanks, NationsList, Religions, SocialStatuses, EmployeeSchema, EmployeeinitialValues, terminationReasons } from "../../_mock/data";
import { configrationdata } from '../../configration';
import { addEmployee } from '../../redux/employee';

function EmployeeEditForm({
  dialogStatus,
  setDialogStatus,
  userID
}) {

  const dispatch = useDispatch();
  const handleFormSubmit = (v) => {
    const data = {
      base: {
        skills: [""],
        name: {
          first: v.firstName,
          father: v.fatherName,
          grandfather: v.grandFatherName,
          family: v.familyName,
          mother: v.motherName
        },
        DOB: v.DOB,
        bornPlace: v.bornPlace,
        religion: v.religeon,
        nationality: v.nationility,
        relationStatus: v.relationStatus,
        IDNumber: v.IDNumber,
        phone: {
          main: v.mainPhoneNumber,
          other: v.otherPhoneNumber
        },
        edu: {
          level: v.latestAcademic,
          degrees: `${v.latestAcademic !== "أمي/ة" ? v.acadmicDegress: ""}`,
          studyPlace: `${v.latestAcademic !== "أمي/ة" ? v.studyPlace: ""}`
        },
        languageKnowlage: v.LanguagesKnowlage,
        military: {
          join: v.military,
          ID: `${v.military? v.militaryID : ""}`,
          role: `${v.military?  v.militaryRole : ""}`
        },
        workBGL: {
          worked: v.workInOtherCompany,
          place: `${v.workInOtherCompany?  v.workPlace : ""}`,
          salary: v.otherCompanySalary
        },
      },
      website: {
        username: v.account_username,
        pwd: v.account_password,
        type: 0
      },
      work: {
        timeGroup: v.time_goup,
        salary: Number(v.salary),
        job_title: `${v.website_account_type === 1? "Root الجذر" : v.website_account_type === 2? "Admin المسؤول": v.website_account_type === 3? "HR الموارد البشرية": v.website_account_type === 4? "Manager مدير الموظفين": "Employee الموظف" }`
      }
    }
    // axios.post(configrationdata.create_employee, data, { headers: { Authorization: localStorage.getItem("token")??"NO TOKEN" }})
    // .then(({data: employeeCreateData})=> {
    //   console.log(employeeCreateData);
    //   dispatch(addEmployee(employeeCreateData.data));
    //   setDialogStatus(false)
    // }).catch(error=> {
    //   console.log(error)
    // })
  }
  const companies = useSelector((state) => state.companies);
  const employee = useSelector((state)=> state.employee);
  React.useEffect(()=> {
    console.log(employee)
  }, [employee.employee]);
  React.useEffect(()=> {
    console.log(companies)
  }, [companies.companies])
  const generateValidationSchema = (fields) => {
    const schema = {};

    Object.entries(fields).forEach(([fieldName, field]) => {
      let fieldSchema = Yup.string();

      if (field.required) {
        fieldSchema = fieldSchema.required(`${field.label} حقل مهم`);
      }

      switch (field.type) {
        case "email":
          fieldSchema = fieldSchema.email("Invalid email address");
          break;
        case "select":
          fieldSchema = fieldSchema.oneOf(
            field.options.map((option) => option.value),
            "خيار غير صالح"
          );
          break;
        case "date":
          if (field.required) {
            fieldSchema = Yup.date().required()
          }
          fieldSchema = Yup.date("يجب ان يكون نوع البيانات تاريخ");
          break;
        case "number":
          if (field.required) {
            fieldSchema = Yup.number(" يجب ان تكون القيمة رقمية ").required(`${field.label} حقل مهم`)
          }
          fieldSchema = Yup.number(" يجب ان تكون القيمة رقمية ")
          break;
        case "checkbox":
          if (field.required) {
            fieldSchema = Yup.boolean().required()
          }
          fieldSchema = Yup.boolean()
          break;
        default:
          break;
      }

      schema[fieldName] = fieldSchema;
    });

    return Yup.object().shape(schema);
  };
  const defaultOps = (span = "span 1", variant = "outlined") => {
    return {
      sx: { gridColumn: span },
      variant,
      fullWidth: true,
      size:"small"
    }
  }
  // Define the form schema
  const formSchema = {
    "معلومات اساسية": {
      type: "dividerChip",
      ops: defaultOps("span 4")
    },
    firstName: {
      type: "text",
      label: "الإسم الأول",
      required: true,
      ops: defaultOps()
    },
    fatherName: {
      type: "text",
      label: "إسم الأب",
      required: true,
      ops: defaultOps()
    },
    grandFatherName: {
      type: "text",
      label: "إسم الجد",
      required: true,
      ops: defaultOps()
    },
    familyName: {
      type: "text",
      label: "إسم العائلة",
      required: true,
      ops: defaultOps()
    },
    DOB: {
      type: "date",
      label: "تاريخ الميلاد",
      required: true,
      ops: defaultOps()
    },
    motherName: {
      type: "text",
      label: "إسم الام",
      required: true,
      ops: defaultOps()
    },
    bornPlace: {
      type: "select",
      label: "مكان الولادة",
      options: JordanianCitys.map((city => { return { label: city, value: city } })),
      ops: defaultOps()
    },
    nationility: {
      type: "select",
      label: "الجنسية",
      options: NationsList.map((nation => { return { label: nation, value: nation } })),
      ops: defaultOps(),
      required: true,
    },
    relationStatus: {
      type: "select",
      label: "الحالة الإجتماعية",
      options: SocialStatuses.map((Status => { return { label: Status, value: Status } })),
      ops: defaultOps(),
      required: true,
    },
    religeon: {
      type: "select",
      label: "الديانة",
      options: Religions.map(religion => { return { label: religion, value: religion } }),
      required: true,
      ops: defaultOps(),
    },
    IDNumber: {
      type: "text",
      label: "رقم الهوية",
      required: true,
      ops: defaultOps()
    },
    mainPhoneNumber: {
      type: "text",
      label: "رقم الهاتف الاساسي",
      required: true,
      ops: defaultOps()
    },
    otherPhoneNumber: {
      type: "text",
      label: "رقم الهاتف البديل",
      required: true,
      ops: defaultOps()
    },
    latestAcademic: {
      type: "select",
      label: "اخر مؤهل علمي",
      required: true,
      ops: defaultOps(),
      options: eduLevels.map(edu=> { return { label: edu, value: edu }})
    },
    acadmicDegress: {
      type: "select",
      label: "التقييم العلمي",
      ops: defaultOps(),
      options: eduDegrees.map(degree=> { return { label: degree, value: degree } }),
      required: false
    },
    studyPlace: {
      type: "text",
      label: "مكان الدراسة",
      ops: defaultOps(),
      required: false
    },
    LanguagesKnowlage: {
      type: "select",
      label: "درجة معرفة اللغات",
      ops: defaultOps(),
      options: eduDegrees.map(degree=> { return { label: degree, value: degree } }),
      required: true
    },
    "الخدمة العكسرية": {
      type: "dividerChip",
      ops: defaultOps("span 4")
    },
    military: {
      type: "checkbox",
      label: "التحق بالخدمة العسكرية",
      required: true,
      ops: defaultOps(),
    },
    militaryID: {
      type: "text",
      label: "الرقم العسكري",
      ops: defaultOps(),
      required: false
    },
    militaryRole: {
      type: "select",
      label: "الرتبة العسكرية",
      required: false,
      ops: defaultOps(),
      options: ([""].concat(MilitaryRanks)).map(rank=> { return { label: rank, value: rank }})
    },
    "اسباقية العمل": {
      type: "dividerChip",
      ops: defaultOps("span 4")
    },
    workInOtherCompany: {
      type: "checkbox",
      label: "عمل بشركات من قبل",
      required: true,
      ops: defaultOps(),
    },
    workPlace: {
      type: "text",
      label: "الشركة التي عمل بها مسبقا",
      ops: defaultOps(),
    },
    otherCompanySalary: {
      type: "number",
      label: "الراتب السابق بالدينار الاردني",
      ops: defaultOps(),
    },
    leaveReason: {
      type: "select",
      label: "سبب انهاء الخدمات",
      ops: defaultOps(),
      options: ([""].concat(terminationReasons)).map(reason=> { return { label: reason, value: reason } })
    },
    "معلومات العمل الحالي": {
      type: "dividerChip",
      ops: defaultOps("span 4")
    },
    salary: {
      type: "number",
      label: "الرتب الشهري",
      ops: defaultOps(),
      required: true
    },
    website_account_type: {
      type: "select",
      label: "القسم",
      ops: defaultOps(),
      required: true,
      options: ["مسؤول", "موارد بشرية", "مدير موظفين", "موظف"].map((department)=> { return { label: department, value: department } })
    },
    time_goup: {
      type: "select",
      label: "وقت العمل",
      ops: defaultOps(),
      options: ["صباحي", "مسائي", "دوام كامل"].map(time=> { return { label: time, value: time } }),
      required: true,
    },
    company_name: {
      type: "select",
      label: "موقع العمل",
      ops: defaultOps(),
      options: companies.companies.map(company=> { return { label: company.name, value: company._id } }),
      required: true,
    },
    "بيانات الحساب الخاص بالموضق": {
      type: "dividerChip",
      ops: defaultOps("span 4")
    },
    account_username: {
      type: "text",
      label: "اسم المستخدم",
      ops: defaultOps(),
      required: true
    },
    account_password: {
      type: "text",
      label: "كلمة المرور",
      ops: defaultOps(),
      required: true
    }
  };
  const generateInitialValues = (fields) => {
    const [employeeoriginal] = employee.employee.filter(emp=> emp._id === userID)
    if(!employeeoriginal) {
        return {}
    };
    const initialValues = {
    firstName : employeeoriginal.name.first,
    fatherName : employeeoriginal.name.father,
    grandFatherName :  employeeoriginal.name.grandfather,
    familyName : employeeoriginal.name.family,
    DOB : employeeoriginal.DOB,
    motherName : employeeoriginal.name.mother,
    bornPlace : employeeoriginal.bornPlace,
    nationility : employeeoriginal.nationality,
    relationStatus : employeeoriginal.relationStatus,
    religeon : employeeoriginal.religion,
    IDNumber : employeeoriginal.IDNumber,
    mainPhoneNumber : employeeoriginal.phone.main,
    otherPhoneNumber : employeeoriginal.phone.other,
    latestAcademic : employeeoriginal.edu.level,
    acadmicDegress : employeeoriginal.edu.degrees,
    studyPlace : employeeoriginal.studyPlace,
    LanguagesKnowlage : employeeoriginal.languageKnowlage,
    military : employeeoriginal.military.join,
    militaryID : employeeoriginal.military.ID,
    militaryRole : employeeoriginal.military.role,
    workInOtherCompany : employeeoriginal.workBGL.worked,
    workPlace : employeeoriginal.workBGL.place,
    otherCompanySalary : employeeoriginal.workBGL.salary,
    leaveReason : employeeoriginal.workBGL.leaveReason,
    salary : employeeoriginal.work.salary,
    website_account_type : employeeoriginal.web_user.type,
    time_goup : employeeoriginal.work.timeGroup,
    company_name : employeeoriginal.work.job_title,
    account_username : employeeoriginal.web_user.username,
    account_password : employeeoriginal.web_user.pwd
    };
    

    return initialValues;
  };
  const validationSchema = generateValidationSchema(formSchema);
  const initialValues = generateInitialValues(formSchema)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} autoComplete="off" >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {
                Object.keys(formSchema).map((key) => {
                    const fieldSchema = formSchema[key];
                    const fieldError = formik.errors[key];
                    const fieldTouched = formik.touched[key];
                    const fieldValue = formik.values[key];
                    const fieldOps = formSchema[key].ops;
                    switch (fieldSchema.type) {
                    case "select":
                        return (
                        <FormControl
                            key={key}
                            fullWidth
                            error={!!fieldTouched && !!fieldError}
                        >
                            <InputLabel id={`${key}-label`}>{fieldSchema.label}</InputLabel>
                            <Select
                            labelId={`${key}-label`}
                            id={key}
                            name={key}
                            value={fieldValue}
                            onChange={(event) => formik.setFieldValue(key, event.target.value)}
                            onBlur={() => formik.setFieldTouched(key, true)}
                            {...fieldOps}
                            >
                            {fieldSchema.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                            {fieldTouched && fieldError && (
                            <FormHelperText>{fieldError}</FormHelperText>
                            )}
                        </FormControl>
                        );

                    case "text":
                    case "number":
                        return (
                        <TextField
                            key={key}
                            id={key}
                            name={key}
                            value={fieldValue}
                            label={fieldSchema.label}
                            type={fieldSchema.type}
                            error={!!fieldTouched && !!fieldError}
                            helperText={fieldTouched && fieldError}
                            required={fieldSchema.required}
                            onChange={(event) =>
                            formik.setFieldValue(key, event.target.value)
                            }
                            onBlur={() => formik.setFieldTouched(key, true)}
                            {...fieldOps}
                        />
                        );

                    case "checkbox":
                        return (
                        <FormControlLabel
                            key={key}
                            control={
                            <Checkbox
                                id={key}
                                name={key}
                                checked={fieldValue}
                                onChange={(event) =>
                                formik.setFieldValue(key, event.target.checked)
                                }
                                {...fieldOps}
                            />
                            }
                            label={fieldSchema.label}
                        />
                        );
                    case "date":
                        return <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label={fieldSchema.label}
                            inputFormat="DD/MM/YYYY"
                            {...fieldOps}
                            onBlur={() => formik.setFieldTouched(key, true)}
                            onChange={(d) => formik.setFieldValue(key, dayjs(d).toDate())}
                            value={fieldValue}
                            error={!!fieldTouched && !!fieldError}
                            helperText={fieldTouched && fieldError}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    case "dividerChip":
                        return <Divider {...fieldOps}>
                        <Chip label={key}/>
                        </Divider>
                    default:
                        return null;
                    }
              })
            }
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              تعديل البيانات
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default EmployeeEditForm;
