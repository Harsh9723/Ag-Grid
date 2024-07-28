import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridComponent = ({ rowData }) => {
  const [colDefs, setColDefs] = useState([
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "price", headerName: "Price", flex: 1, minWidth: 100 },
    {
      field: "description",
      headerName: "Description",
      cellStyle: { 'white-space': 'normal' }, 
      flex: 2, 
      minWidth: 200,
    },
   
  ]);

  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <Typography variant="h6" gutterBottom>
        Selected Node Details
      </Typography>
      <Box 
        className="ag-theme-alpine" 
        sx={{ 
          height: '200px', 
          width: '100%', 
          '& .ag-cell': { 
            'white-space': 'normal', 
            overflow: 'visible', 
            textOverflow: 'clip', 
            lineHeight: '1.5',
            
          },
          '& .ag-root-wrapper': {
            paddingBottom: '0px !important',
          }
        }}
      >
        <AgGridReact 
          rowData={rowData}
          columnDefs={colDefs}
          domLayout='autoHeight'
          defaultColDef={{
            resizable: true,
            autoHeight: true,
            
          }}
        />
      </Box>
    </Box>
  );
};

export default AgGridComponent;
