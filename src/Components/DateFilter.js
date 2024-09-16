import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateFilter = ({ rows, onFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateFilter = () => {
    const filtered = rows.filter((row) => {
      const rowDate = dayjs(row.DATE, 'MM/DD/YYYY');

      if (startDate && endDate) {
        return rowDate.isAfter(dayjs(startDate)) && rowDate.isBefore(dayjs(endDate));
      } else if (startDate) {
        return rowDate.isAfter(dayjs(startDate));
      } else if (endDate) {
        return rowDate.isBefore(dayjs(endDate));
      }
      return true;
    });

    onFilter(filtered);
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    onFilter(rows); // Reset to all rows
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Button variant="contained" onClick={handleDateFilter}>
          Filter
        </Button>
        <Button variant="outlined" onClick={handleClearFilter}>
          Clear
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateFilter;
