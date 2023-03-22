import { Helmet } from 'react-helmet-async';
import { exportToExcel } from "react-json-to-excel";
import { useSelector } from 'react-redux';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { DataGrid, GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
 } from '@mui/x-data-grid';

// components
import { accountExcelData, accountRows } from '../sections/@data-gen/accountingManagment';
import CreateEmployeeDialog from '../layouts/Employees/EmployeeCreateDialog';

import Iconify from '../components/iconify';
import EmployeeCreateForm from '../layouts/Employees/EmployeeCreateForm';


export default function AccountingPage() {
  const employees = useSelector((state)=> state.employee);
  const employeeData = accountRows(employees.employee);
  const [rows, setRows] = useState(employeeData);
  useEffect(()=> {
    console.log(employees.employee)
  }, [employees.employee])
  const handleRowEdit = async (id) => {
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
    { field: 'username', headerName: "اسم المستخدم", width: 150 },
    { field: 'pwd', headerName: "كلمة المرور", width: 200 },
    { field: 'type', headerName: "نوع الحساب", width: 150 },
  ];


  function AccountingToolBar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button variant='text' onClick={()=> {
          exportToExcel(accountExcelData(rows), "الحسابات")
        }}
        startIcon={<Iconify icon="mdi:microsoft-excel" />}
        >تصدير الى ايكسل</Button>
      </GridToolbarContainer>
    );
  }

  
  return (
    <>
      <Helmet>
        <title> الحسابات </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            الحسابات
          </Typography>
        </Stack>
        <Card sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: AccountingToolBar,
              
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
