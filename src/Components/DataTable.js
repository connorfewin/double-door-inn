import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import DateFilter from './DateFilter';
import '../Styles/DataTable.css';
import '../Styles/Buttons.css';
import { createShowAPI, fetchAllShowsAPI } from '../Api/show';

const columns = [
  { field: 'DATE', headerName: 'Date', width: 120, cellClassName: 'tableCell', sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
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

function DataTable({ superAdmin }) {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const gridRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      const shows = await fetchAllShowsAPI();
      const formattedRows = shows.map(show => ({
        HEADLINER: show.headliner,
        DAY: show.day,
        DATE: getDate(show.date),
        id: show.id,
      }));
      setRows(formattedRows);
      setFilteredRows(formattedRows);
      setLoading(false);
    };
    
    fetchShows();
  }, []); 

  const handleAdd = async (newEntry) => {
    // Check for duplicates
    const duplicate = rows.find(row => 
      row.HEADLINER.toLowerCase() === newEntry.HEADLINER.toLowerCase() && row.DATE === newEntry.DATE
    );
  
    if (duplicate) {
      setError(`${duplicate.HEADLINER} already has a show on ${duplicate.DATE}.`);
      return { error: true }; // Indicate an error
    }

    if (!newEntry.DATE) {
      setError(`Entry requires a date`)
      return { error: true }
    }

    if (newEntry.HEADLINER === '') {
      setError(`Entry requires a headliner`)
      return { error: true }
    }
  
    const newShow = await createShowAPI(newEntry);
    const newRow = {
      id: newShow.id,
      DATE: newShow.date,
      DAY: newShow.day,
      HEADLINER: newShow.headliner
    };
    setRows([...rows, newRow]);
    setFilteredRows([...rows, newRow]);
    setError(''); // Clear any existing error
  
    return { error: false }; // Indicate success
  };
  

  const handleFilter = (filtered) => {
    setFilteredRows(filtered);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = rows.filter(row => row.HEADLINER.toLowerCase().includes(value));
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
    const isCurrentlyExpanded = expandedRowId === params.id;
    if (expandedRowId >= 0) {
      setExpandedRowId(null);
    }
    if (isOverflown(cellElement)) {
      setExpandedRowId(isCurrentlyExpanded ? null : params.id);
    }
  };

  const getRowHeight = (params) => {
    return expandedRowId === params.id ? 'auto' : 52;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gridRef.current && !gridRef.current.contains(event.target)) {
        setExpandedRowId(null);
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
        <input
          type="text"
          placeholder="Search by Headliner"
          value={searchTerm}
          onChange={handleSearch}
          className="searchInput"
        />
        <DateFilter rows={rows} onFilter={handleFilter} />
      </div>
      <div style={{ height: 500, margin: 'auto', overflowX: 'auto' }} ref={gridRef}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection={superAdmin}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          onCellClick={handleCellClick}
          getRowHeight={getRowHeight}
          className="DataTable"
          loading={loading} 
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
          initialState={{
            pinnedColumns: {
              left: ['desk'],
            },
          }}
        />
      </div>
      {superAdmin && 
        <div className="add-button-container">
          <DeleteButton
            selectionModel={selectionModel}
            rows={rows}
            setRows={setRows}
            setSelectionModel={setSelectionModel}
            setFilteredRows={setFilteredRows}
          />
          <AddButton onAdd={handleAdd} errorMessage={error} /> {/* Pass error message to AddButton */}
        </div>
      }
    </div>
  );
}

export default DataTable;
