import { Helmet } from 'react-helmet-async';
import { exportToExcel } from "react-json-to-excel";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
 } from '@mui/x-data-grid';

// components
import { employeeExcelData, employeeRows } from '../sections/@data-gen/employeesManagment';
import CreateEmployeeDialog from '../layouts/Employees/EmployeeCreateDialog';

import Iconify from '../components/iconify';
import EmployeeCreateForm from '../layouts/Employees/EmployeeCreateForm';
import EmployeeEditForm from '../layouts/Employees/EmployeeEditForm';


export default function EmployeePage() {
  const employees = useSelector((state)=> state.employee);
  const employeeData = employeeRows(employees.employee);
  const [rows, setRows] = useState(employeeData);
  const [createEmployeeStatus, setCreateEmployeeStatus] = useState(false);
  const [editEmployeeStatus, setEditEmployeeStatus] = useState({ status: false, id: null});
  const setEditStstus = (status)=> {
    setEditEmployeeStatus({ id: null, status: false})
  }
  useEffect(()=> {
    const empData = employeeRows(employees.employee);
    setRows(empData);
    console.log(employees.employee)
  }, [employees.employee])
  const handleRowEdit = async (id) => {
    setEditEmployeeStatus({ status: true, id });
    console.log(editEmployeeStatus);
    console.log(id)
  };
  // Columns for the data grid
  const columns = [
    {
      field: 'edit',
      headerName: 'تعديل',
      width: 50,
      renderCell: (params) => (
        <IconButton onClick={() => handleRowEdit(params.row.id)}>
          <Iconify icon="line-md:edit" />
        </IconButton>
      ),
    },
    { field: 'name', headerName: 'الاسم', width: 250 },
    { field: 'jobTitle', headerName: "المسمى الوضيفي", width: 150 },
    { field: 'mother', headerName: 'اسم الام', width: 100 },
    { field: 'IDNumber', headerName: 'رقم الهوية', width: 150 },
    { field: 'DOB', headerName: 'تاريخ الميلاد', width: 150, type: "Date" },
    { field: 'bornPlace', headerName: 'مكان الولادة', width: 100 },
    { field: 'religion', headerName: 'الدين', width: 100 },
    { field: 'nationality', headerName: 'الجنسية', width: 100 },
    { field: 'relationStatus', headerName: 'الحالة الاجتماعية', width: 50 },
    { field: 'mainPhone', headerName: 'هاتف اساسي', width: 130 },
    { field: 'otherPhone', headerName: 'هاتف ثانوي', width: 130 },
    { field: 'edu', headerName: "مستوى التعليمي", width: 130 },
    { field: 'languageKnowlage', headerName: "معرفة اللغات", width: 50 },
    { field: 'military', headerName: "الخدمة العسكرية", width: 200 },
    { field: 'otherCompany', headerName: "الشركات الاخرى", width: 200 },

  ];


  function EmployeeToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button variant='text' onClick={()=> {
          exportToExcel(employeeExcelData(rows), "الموظفين")
        }}
        startIcon={<Iconify icon="mdi:microsoft-excel" />}
        >تصدير الى ايكسل</Button>
      </GridToolbarContainer>
    );
  }

  
  return (
    <>
      <Helmet>
        <title> الموظفين </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            الموظفين
          </Typography>
          <Button variant="contained" onClick={()=> setCreateEmployeeStatus(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
           اضافة موظف 
          </Button>
        </Stack>
        <CreateEmployeeDialog  title={"اضافة موظف"} dialogStatus={createEmployeeStatus} setDialogStatus={setCreateEmployeeStatus}>
          <EmployeeCreateForm  dialogStatus={createEmployeeStatus} setDialogStatus={setCreateEmployeeStatus}/>
        </CreateEmployeeDialog>
        <CreateEmployeeDialog title={"تعديل بيانات الموظف"} dialogStatus={editEmployeeStatus.status} setDialogStatus={setEditStstus}>
          <EmployeeEditForm dialogStatus={editEmployeeStatus.status} setDialogStatus={setEditStstus} userID={editEmployeeStatus.id} />
        </CreateEmployeeDialog>
        <Card sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: EmployeeToolbar,
              
            }}
            localeText={{
              toolbarColumns: 'عرض الأعمدة',
              toolbarFilters: `فرز`,
              toolbarDensity: `اسلوب العرض`,
              toolbarDensityComfortable: `مريح`,
              toolbarDensityStandard: `طبيعي`,
              toolbarDensityCompact: `مكثف`,
              toolbarExport: `تصدير`,
              columnsPanelShowAllButton: "عرض الكل",
              columnsPanelHideAllButton: "اخفاء الكل",
              columnsPanelTextFieldLabel: "الاعمدة",
              columnsPanelTextFieldPlaceholder: "ادخل العنوان"
            }}
          />
        </Card>

      </Container>
    </>
  );
}
