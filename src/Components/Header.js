import React from 'react';
import '../Styles/Header.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

function Header() {
  return (
    <div className="Header">
      <h1>The Double Door Inn</h1>
      <h2>Celebrating 43 Years of Live Music</h2>

      <div className="HeaderIcons">
        <LocationOnIcon />
        <p>Charlotte, North Carolina</p>
        <CalendarMonthTwoToneIcon />
        <p>1973-2017</p>
      </div>
    </div>
  );
}

export default Header;
