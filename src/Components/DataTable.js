import React, { useState, useEffect, useRef } from 'react';
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
  { field: 'HEADLINER', headerName: 'Headliner', flex: 1, cellClassName: 'headlinerCell' },
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
}));

function DataTable() {
  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null); // Store only one expanded row ID
  
  const gridRef = useRef(null); // To reference the grid for detecting outside clicks

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

  const isOverflown = (element) => {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  };

  const handleCellClick = (params, event) => {
    const cellElement = event.currentTarget;
    if (isOverflown(cellElement)) {
      setExpandedRowId((prev) => {
        return prev === params.id ? null : params.id; // Toggle between expanding and collapsing
      });
    }
  };

  const getRowHeight = (params) => {
    return expandedRowId === params.id ? 'auto' : 52; // Default row height is 52px
  };

  // Collapse any expanded row if clicking outside of the table
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gridRef.current && !gridRef.current.contains(event.target)) {
        setExpandedRowId(null); // Collapse the expanded row when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [gridRef]);

  return (
    <div>
      <div style={{ margin: 'auto', overflowX: 'auto' }} className="filter-button-container">
        <DateFilter rows={rows} onFilter={handleFilter} />
      </div>
      <div style={{ height: 500, margin: 'auto', overflowX: 'auto' }} ref={gridRef}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection={false}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          onCellClick={handleCellClick}
          getRowHeight={getRowHeight}
          className="DataTable"
        />
      </div>
    </div>
  );
}

export default DataTable;
