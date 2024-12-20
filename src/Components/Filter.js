import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../Styles/Filter.css';

const Filter = ({ shows, onFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {       
    const filtered = shows.filter((show) => {
      const showDate = dayjs(show.date, 'MM/DD/YYYY');

      if (startDate && endDate) {
        return showDate.isAfter(dayjs(startDate)) && showDate.isBefore(dayjs(endDate));
      } else if (startDate) {
        return showDate.isAfter(dayjs(startDate));
      } else if (endDate) {
        return showDate.isBefore(dayjs(endDate));
      }
      return true;
    });

    const finalFiltered = filtered.filter(row => row.headliner.toLowerCase().includes(searchTerm.toLowerCase()));
    onFilter(finalFiltered);
  }, [startDate, endDate, searchTerm, onFilter, shows]);

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm('');
    onFilter(shows);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="searchInput">
        <TextField
            label="Search by Headliner"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
      </div>
      <Box display="flex" gap="10px" margin="10px 0">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <Button variant="outlined" onClick={handleClearFilter}>
          Clear
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Filter;
