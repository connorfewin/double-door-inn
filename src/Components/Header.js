import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import Profile from '../Components/Profile';
import VerifyComments from './Comments/VerifyComments';
import '../Styles/Header.css';

function Header({ superAdmin, setSuperAdmin }) {
  const location = useLocation();

  // Determine active tab based on current pathname
  const tabValue = location.pathname === '/comments' ? 1 : 0;
  
  return (
    <div className="Header">
      <h1>The Double Door Inn</h1>
      <h2>Celebrating 43 Years of Live Music</h2>
      <div className="HeaderTopRow">
        {/* Tabs on the Left */}
        <div className="HeaderTabs">
          <Tabs value={tabValue} variant="standard">
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Comments" component={Link} to="/comments" />
          </Tabs>
        </div>

        {/* Icons in the Middle */}
        <div className="HeaderIcons">
          <LocationOnIcon />
          <p>Charlotte, North Carolina</p>
          <CalendarMonthTwoToneIcon />
          <p>1973-2017</p>
        </div>

        {/* Profile and VerifyComments in a Stack on the Right */}
        <div className="HeaderProfile">
          <Stack spacing={2} direction="row" sx={{ color: 'action.active', alignItems: 'center' }}>
            {superAdmin && <VerifyComments />}
            <Profile setSuperAdmin={setSuperAdmin} />
          </Stack>
        </div>
      </div>

      {/* Responsive Row for Smaller Screens */}
      <div className="HeaderBottomRow">
        <div className="HeaderTabs">
          <Tabs value={tabValue} variant="standard">
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Comments" component={Link} to="/comments" />
          </Tabs>
        </div>
        <div className="HeaderProfile">
          <Stack spacing={2} direction="row" sx={{ color: 'action.active', alignItems: 'center' }}>
            {superAdmin && <VerifyComments />}
            <Profile setSuperAdmin={setSuperAdmin} />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Header;
