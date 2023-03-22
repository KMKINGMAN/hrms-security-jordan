import { Helmet } from 'react-helmet-async';
import { exportToExcel } from "react-json-to-excel";
import { useSelector } from 'react-redux';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import ReactDOM from 'react-dom';// @mui
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
  Divider,
} from '@mui/material';
import { DataGrid, GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
 } from '@mui/x-data-grid';

 import mapboxgl from 'mapbox-gl';
 import 'mapbox-gl/dist/mapbox-gl.css';
// components
import { companyRows, companyExcelData } from '../sections/@data-gen/companyManagment';
import CreateComapnyDialog from '../layouts/Employees/EmployeeCreateDialog';

import Iconify from '../components/iconify';
import CompanyCreateForm from '../layouts/Companies/CompanyCreateForm';


export default function EmployeePage() {
  const mapContainer = useRef(null);
  // const main = "31.949694, 35.840065".split(", ").map(parseFloat);
  const companies = useSelector((state) => state.companies);
  const companiesData = companyRows(companies.companies);
  const [rows, setRows] = useState(companiesData);
  const [createCompanyStatus, setCreateCompany] = useState(false);
  const [editCompany, setEditCompany] = useState({ status: false, id: null});
  const setEditCompanyStatus = (data) => setEditCompany({ status: data, id: null});
  useEffect(() => {
    mapboxgl.accessToken = 'MapAuth';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: "31.949694, 35.840065".split(", ").map(parseFloat).reverse(),
      zoom: 8,
      locale: "ar"
    });
    companies.companies.map(comp=> {
      const content = document.createElement("div");
      ReactDOM.render(
        <div>
          <Typography variant="button">{comp.name}</Typography>
          <Typography variant="">
            {comp.employees.length} موظف مسجل
          </Typography>
        </div>,
        content
      );
      const popup = new mapboxgl.Popup()
      .setLngLat(comp.location.split(", ").map(parseFloat).reverse())
      .setDOMContent(content)
      .addTo(map);
      const marker = new mapboxgl.Marker({
        color: "#FF0000"
      })
      .setLngLat(comp.location.split(", ").map(parseFloat).reverse())
      .setPopup(popup)
      .addTo(map)
      .getElement()
      .setAttribute('title', 'اضغط لعرض تفاصيل الشركة');
      return {
        marker,
        popup
      }
    })
    return () => {
      map.remove();
    };
  }, []);
  useEffect(()=> {
    console.log(companies.companies)
  }, [companies.companies]);

  const handleRowEdit = async (id) => {
    console.log(id)
    setEditCompany({ status: true, id });
  };
  const handleRowDelete = async (id)=> {
    console.log(id)
  }
  const handleShowEmployee = (id) => { return setEditCompany({ status: true, id }); };
  
  const columns = [
    { field: 'name', headerName: 'الاسم', width: 250 },
    { field: 'location', headerName: "الموقع", width: 200 },
    { field: 'employees', headerName: "العدد", width: 50 },
    {
      field: 'edit',
      headerName: 'تعديل',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleRowEdit(params.row.id)}>
          <Iconify icon="line-md:edit" />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'حذف',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleRowDelete(params.row.id)}>
          <Iconify icon="material-symbols:scan-delete-outline" />
        </IconButton>
      ),
    },
    {
      field: 'show',
      headerName: 'عرض الموضفين',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleShowEmployee(params.row.id)}>
          <Iconify icon="mdi:show-outline" />
        </IconButton>
      ),
    },
    
  ];


  function CompanyToolBar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button variant='text' onClick={()=> {
          exportToExcel(companyExcelData(rows), "الشركات")
        }}
        startIcon={<Iconify icon="mdi:microsoft-excel" />}
        >تصدير الى ايكسل</Button>
      </GridToolbarContainer>
    );
  }

  
  return (
    <>
      <Helmet>
        <title> ادارة الشركات </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            الشركات
          </Typography>
          <Button variant="contained" onClick={()=> setCreateCompany(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
           اضافة شركة
          </Button>
        </Stack>
        <CreateComapnyDialog  title={"اضافة شركة"} dialogStatus={createCompanyStatus} setDialogStatus={setCreateCompany}>
          <CompanyCreateForm/>
        </CreateComapnyDialog>
        <CreateComapnyDialog title={"تعديل الشركة"} dialogStatus={editCompany.status} setDialogStatus={setEditCompanyStatus}>
          <CompanyCreateForm/>
        </CreateComapnyDialog>
        <Card sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: CompanyToolBar,
              
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
        <Divider sx={{
          mt: "10px",
          mb: "10px"
        }}/>
        <Card sx={{ height: 500 }}>
          <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
        </Card>
      </Container>
    </>
  );
}
