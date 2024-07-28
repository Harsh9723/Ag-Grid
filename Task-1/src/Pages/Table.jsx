import React, { useEffect, useMemo, useState } from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { Box, TextField, Container, Grid, CssBaseline, createTheme, ThemeProvider, Skeleton } from '@mui/material';
import '../index.css' 

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: '10px',
                },
            },
        },
    },
});

function Table() {
    const [rowData, setRowData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [gridApi, setGridApi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/getemployee')
            .then(response => {
                setRowData(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching employee data:", error);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, []);

    const getCellStyle = (params) => {
        if (params.colDef.field === 'Birthdate') {
            const birthdate = new Date(params.value);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            return null; // Adjust if you have specific styles for age
        }
        return null;
    };

    const columnDefs = useMemo(() => [
        { headerName: "First Name", field: "firstname", filter: true, filterParams:'', headerClass: 'table-header-center', cellStyle: { whiteSpace: 'normal' },  },
        { headerName: "Last Name", field: "lastname", filter: true, headerClass: 'table-header-center', cellStyle: { whiteSpace: 'normal' } },
        { headerName: "Contact", field: "Contact", filter: true,  cellStyle: { textAlign: 'center', whiteSpace: 'normal' } },
        { headerName: "Email", field: "Email", filter: true, headerClass: 'table-header-center', cellStyle: { whiteSpace: 'normal' } },
        { headerName: "Age", field: "Age", filter: true, headerClass: 'table-header-center', cellStyle: { textAlign: 'center',  } },
        { headerName: "Address", field: "Address", filter: true, headerClass: 'table-header-center', cellStyle: { whiteSpace: 'normal' } },
        {
            headerName: "Birthdate",
            field: "Birthdate",
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    if (!cellValue) return -1; // handle null values
                    const cellDate = new Date(cellValue);
                    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                        return 0;
                    } else if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else {
                        return 1;
                    }
                },
                browserDatePicker: true
            },
            headerClass: 'table-header-center',
            cellStyle: getCellStyle
        }
    ], []);

    const defaultColDef = useMemo(() => ({
        floatingFilter: true,
    }), []);

    const paginationPageSizeSelector = [5, 10, 50, 100];

    useEffect(() => {
        if (startDate && endDate && gridApi) {
            const dateFrom = new Date(startDate).toISOString().split('T')[0];
            const dateTo = new Date(endDate).toISOString().split('T')[0];
            gridApi.setFilterModel({
                Birthdate: {
                    filterType: 'date',
                    type: 'inRange',
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            });
            gridApi.onFilterChanged();
        }
    }, [startDate, endDate, gridApi]);

    const onGridReady = params => {
        setGridApi(params.api);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Box sx={{ my: 4 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="From"
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="To"
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box className="ag-theme-quartz" sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={400} />
                    ) : (
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            paginationPageSize={5}
                            onGridReady={onGridReady}
                            paginationPageSizeSelector={paginationPageSizeSelector}
                        />
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Table;
