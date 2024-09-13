import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import DateFilter from './DateFilter'; // Import the new DateFilter component
import sampleData from '../Helpers/SampleData.json';
import '../Styles/DataTable.css';
import '../Styles/Buttons.css';

const columns = [
  { field: 'DATE', headerName: 'Date', width: 100, cellClassName: 'tableCell', sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
  { field: 'DAY', headerName: 'Day', width: 100, cellClassName: 'tableCell' },
  { field: 'HEADLINER', headerName: 'Headliner', width: 500, cellClassName: 'tableCell' },
  { field: 'OPENER', headerName: 'Opener', width: 400, cellClassName: 'tableCell' },
  { field: 'NOTES', headerName: 'Notes', width: 250, cellClassName: 'tableCell' },  
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
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleAdd = (newEntry) => {
    const newRow = {
      id: rows.length,
      ...newEntry,
      DATE: getDate(newEntry.DATE),
    };
    setRows([...rows, newRow]);
    setFilteredRows([...rows, newRow]); // Update filtered rows as well
  };

  const handleFilter = (filtered) => {
    setFilteredRows(filtered);
  };

  return (
    <div>
      {/* Updated row container for the filter and buttons */}
      <div className="filter-button-container">
        <DateFilter rows={rows} onFilter={handleFilter} />
        <div className="button-container">
          <DeleteButton
            selectionModel={selectionModel}
            rows={rows}
            setRows={setRows}
            setSelectionModel={setSelectionModel}
            setFilteredRows={setFilteredRows} // Pass setFilteredRows as prop
          />
          <AddButton onAdd={handleAdd} />          
        </div>
      </div>

      <div style={{ height: 400, width: '100%', margin: 'auto', overflowX: 'auto' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection={false}
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
