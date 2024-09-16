import React, { useState } from 'react';
import { DataGrid, GridFooterContainer, GridPagination } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 32 },
  { id: 3, name: 'Alex Johnson', age: 45 },
];

export default function CustomDataGrid() {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [clickedCellData, setClickedCellData] = useState(null);

  const handleRowSelection = (ids) => {
    if (ids.length === 0) {
      setSelectedRowData(null);
    } else {
      const selectedID = ids[0]; // Assuming single selection for simplicity
      const selectedRow = rows.find((row) => row.id === selectedID);
      setSelectedRowData(selectedRow);
    }
  };

  const handleCellClick = (params) => {
    setClickedCellData({
      field: params.field,
      value: params.value,
    });
  };

  // Custom footer component that includes the pagination and selected/clicked data
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        {/* Custom message */}
        <div style={{ padding: '10px' }}>
          {clickedCellData
            ? `Clicked Cell: ${clickedCellData.field} - ${clickedCellData.value}`
            : selectedRowData
            ? `Selected Row: Name - ${selectedRowData.name}, Age - ${selectedRowData.age}`
            : 'No rows selected'}
        </div>
        {/* Pagination controls */}
        <GridPagination />
      </GridFooterContainer>
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => handleRowSelection(ids)}
        onCellClick={handleCellClick} // Add onCellClick to capture cell data
        slots={{
          footer: CustomFooter, // Override the default footer
        }}
      />
    </div>
  );
}
