import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';
import { Button } from '@mui/material';
import sampleData from '../Helpers/SampleData.json';
import '../Styles/DataTable.css'; // Updated import
import '../Styles/Buttons.css'; // For button styles

const columns = [
  { field: 'DATE', headerName: 'Date', width: 200, cellClassName: 'tableCell', sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
  { field: 'HEADLINER', headerName: 'Headliner', width: 300, cellClassName: 'tableCell' },
  { field: 'OPENER', headerName: 'Opener', width: 300, cellClassName: 'tableCell' },
  { field: 'NOTES', headerName: 'Notes', width: 250, cellClassName: 'tableCell' },
  { field: 'DAY', headerName: 'Day', width: 150, cellClassName: 'tableCell' },
];

function getDate(date) {
  const newDate = new Date(date);
  if (isNaN(newDate)) {
    return '';
  }
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  return `${month}/${day}/${year}`;
}

const initialRows = sampleData.map((item, index) => ({
  id: index,
  DAY: item.DAY,
  DATE: getDate(item.DATE),
  HEADLINER: item.HEADLINER,
  OPENER: item.OPENER,
  NOTES: item.NOTES,
}));

function DataTable() {
  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleAdd = (newEntry) => {
    const newRow = {
      id: rows.length,
      ...newEntry,
      DATE: getDate(newEntry.DATE),
    };
    setRows([...rows, newRow]);
  };

  const handleDelete = () => {
    const remainingRows = rows.filter((row) => !selectionModel.includes(row.id));
    setRows(remainingRows);
    setSelectionModel([]);
  };

  return (
    <div>
      <div className="button-container">
        <AddButton onAdd={handleAdd} />
        <Button
          variant="contained"
          className="delete-button"
          onClick={handleDelete}
          disabled={selectionModel.length === 0}
          style={{ marginLeft: '10px' }}
        >
          Delete
        </Button>
      </div>
      <div style={{ height: 600, width: '100%', margin: 'auto', overflowX: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          className="DataTable"
        />
      </div>
    </div>
  );
}

export default DataTable;
