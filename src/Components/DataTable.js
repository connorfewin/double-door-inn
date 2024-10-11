import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import DateFilter from './DateFilter';
import '../Styles/DataTable.css';
import '../Styles/Buttons.css';
import { createShowAPI, fetchAllShowsAPI } from '../Api/show';

const columns = [
  { field: 'date', headerName: 'Date', width: 120, cellClassName: 'tableCell', sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
  { field: 'day', headerName: 'Day', width: 100, cellClassName: 'tableCell' },
  { field: 'headliner', headerName: 'Headliner', flex: 1, cellClassName: 'headlinerCell' },
];

function DataTable({ superAdmin }) {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const gridRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
        setLoading(true);
        
        // Check if data exists in local storage
        const cachedShows = localStorage.getItem('shows');
        
        if (cachedShows) {
            // Parse and use the cached data
            const parsedShows = JSON.parse(cachedShows);
            setShows(parsedShows);
            setFilteredShows(parsedShows);
            setLoading(false);
            return; // Exit if we are using cached data
        }
        // If no cached data, fetch from the API
        const fetchedShows = await fetchAllShowsAPI();
        //Store the fetched data in local storage
        localStorage.setItem('shows', JSON.stringify(fetchedShows));
        
        setShows(fetchedShows);
        setFilteredShows(fetchedShows);
        setLoading(false);
    };

    fetchShows();
  }, []);

  const handleAdd = async (newEntry) => {
    // Check for duplicates
    const duplicate = shows.find(row => 
      row.headliner.toLowerCase() === newEntry.headliner.toLowerCase() && row.date === newEntry.date
    );
  
    if (duplicate) {
      setError(`${duplicate.headliner} already has a show on ${duplicate.date}.`);
      return { error: true }; // Indicate an error
    }

    if (!newEntry.date) {
      setError(`Entry requires a date`)
      return { error: true }
    }

    if (newEntry.headliner === '') {
      setError(`Entry requires a headliner`)
      return { error: true }
    }
  
    const newShow = await createShowAPI(newEntry);
    const updatedShows = [...shows, newShow];
    setShows(updatedShows);
    setFilteredShows(updatedShows);
    setError(''); // Clear any existing error

    localStorage.setItem('shows', JSON.stringify(updatedShows));
    
    return { error: false }; // Indicate success
  };
  

  const handleFilter = (filtered) => {
    setFilteredShows(filtered);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = shows.filter(row => row.headliner.toLowerCase().includes(value));
    setFilteredShows(filtered);
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
        <DateFilter shows={shows} onFilter={handleFilter} />
      </div>
      <div style={{ height: 500, margin: 'auto', overflowX: 'auto' }} ref={gridRef}>
        <DataGrid
          rows={filteredShows}
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
              noShowsVariant: 'skeleton',
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
            shows={shows}
            setShows={setShows}
            setSelectionModel={setSelectionModel}
            setFilteredShows={setFilteredShows}
          />
          <AddButton onAdd={handleAdd} errorMessage={error} setError={setError} /> {/* Pass error message to AddButton */}
        </div>
      }
    </div>
  );
}

export default DataTable;
