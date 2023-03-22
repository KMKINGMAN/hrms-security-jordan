import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import dayjs from "dayjs";

// import { useDeclarative } from "react-declarative";
import { Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Divider, useMediaQuery, MenuItem, FormControl, Select, InputLabel, FormHelperText, Chip } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { eduDegrees, eduLevels, JordanianCitys, MilitaryRanks, NationsList, Religions, SocialStatuses, EmployeeSchema, EmployeeinitialValues, terminationReasons } from "../../_mock/data";

function CompanyCreateForm() {
  const handleFormSubmit = (values) => {
    console.log(values)
  }
  const companies = useSelector((state) => state.companies);

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
  const defaultOps = (span = "span 2", variant = "outlined") => {
    return {
      sx: { gridColumn: span },
      variant,
      fullWidth: true,
      size:"small"
    }
  }
  // Define the form schema
  const formSchema = {
    name: {
        type: "text",
        label: "اسم الشركة",
        required: true,
        ops: defaultOps()
      },
    location: {
        type: "text",
        label: "إحداثيات الشركة",
        required: true,
        ops: defaultOps()
    }
  };
  const generateInitialValues = (fields) => {
    const initialValues = {};

    Object.entries(fields).forEach(([fieldName, field]) => {
      switch (field.type) {
        case "checkbox":
          initialValues[fieldName] = false;
          break;
        case "select":
          initialValues[fieldName] = field.options[0].value;
          break;
        case "date":
          initialValues[fieldName] = null;
          break;
        case "number":
          initialValues[fieldName] = 0;
          break;
        default:
          initialValues[fieldName] = "";
          break;
      }
    });

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
              إنشاء شركة
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default CompanyCreateForm;
