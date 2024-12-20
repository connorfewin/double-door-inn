import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import Filter from './Filter';
import '../Styles/DataTable.css';
import '../Styles/Buttons.css';
import { createShowAPI, fetchAllShowsAPI } from '../Api/show';
import { fetchAdminSettingsAPI } from '../Api/adminSettings';
import { useCallback } from 'react';
import EditButton from './EditButton';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const gridRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      const adminSettings = await fetchAdminSettingsAPI();
      const cachedShows = localStorage.getItem('shows');
      const fetchedDataTimeStamp = localStorage.getItem('fetchedData');

      if (cachedShows && (fetchedDataTimeStamp > adminSettings.lastUpdate)) {
        const parsedShows = JSON.parse(cachedShows);
        setShows(parsedShows);
        setFilteredShows(parsedShows);
        setLoading(false);
        return;
      }

      const fetchedShows = await fetchAllShowsAPI();
      localStorage.setItem('shows', JSON.stringify(fetchedShows));
      localStorage.setItem('fetchedData', new Date().toISOString());

      setShows(fetchedShows);
      setFilteredShows(fetchedShows);
      setLoading(false);
    };

    fetchShows();
  }, []);

  const handleAdd = async (newEntry) => {
    const duplicate = shows.find(row => 
      row.headliner.toLowerCase() === newEntry.headliner.toLowerCase() && row.date === newEntry.date
    );

    if (duplicate) {
      setError(`${duplicate.headliner} already has a show on ${duplicate.date}.`);
      return { error: true };
    }

    if (!newEntry.date) {
      setError(`Entry requires a date`);
      return { error: true };
    }

    if (newEntry.headliner === '') {
      setError(`Entry requires a headliner`);
      return { error: true };
    }

    const newShow = await createShowAPI(newEntry);
    const updatedShows = [...shows, newShow];
    setShows(updatedShows);
    setFilteredShows(updatedShows);
    setError('');

    localStorage.setItem('shows', JSON.stringify(updatedShows));

    return { error: false };
  };

  const handleFilter = useCallback((filtered) => {
    setFilteredShows(filtered);
  }, []); 

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
      <div className="filter-button-container">
        <Filter shows={shows} onFilter={handleFilter} /> 
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
            shows={shows}
            setShows={setShows}
            setSelectionModel={setSelectionModel}
            setFilteredShows={setFilteredShows}
          />
          <EditButton 
            selectedRows={selectionModel}
            shows={shows}
            setError={setError}
          />
          <AddButton onAdd={handleAdd} errorMessage={error} setError={setError} />
        </div>
      }
    </div>
  );
}

export default DataTable;
