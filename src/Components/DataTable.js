import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';  // Import the new AddButton component
import sampleData from '../Helpers/SampleData.json';
import '../App.css';

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

// Initial rows from sample data
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

  const handleAdd = (newEntry) => {
    const newRow = {
      id: rows.length,
      ...newEntry,
      DATE: getDate(newEntry.DATE),
    };
    setRows([...rows, newRow]);
  };

  return (
    <><AddButton onAdd={handleAdd} />
    <div style={{ height: 600, width: '100%', margin: 'auto', overflowX: 'auto' }}>
          <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              className="DataTable" />
      </div></>
  );
}

export default DataTable;
