import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentIcon from '@mui/icons-material/Comment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

import Profile from '../Components/Profile';
import VerifyComments from './Comments/VerifyComments';
import '../Styles/Header.css';

function Header({ superAdmin, setSuperAdmin }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <div className="headerContainer">
      <h1 className="headerTitle">The Double Door Inn</h1>
      <h2 className="headerSubtitle">Celebrating 43 Years of Live Music</h2>

      {/* Top Bar with Drawer, Icons, and Profile */}
      <div className="topBar">
        {/* Left: Drawer (Hamburger) Button */}
        <div className="drawerButtonWrapper">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </div>

        {/* Center: Location & Date */}
        <div className="centerIcons">
          <LocationOnIcon />
          <p>Charlotte, North Carolina</p>
          <CalendarMonthTwoToneIcon />
          <p>1973-2017</p>
        </div>

        {/* Right: Profile / Verify Comments */}
        <div className="profileArea">
          <Stack
            spacing={2}
            direction="row"
            sx={{ color: 'action.active', alignItems: 'center' }}
          >
            {superAdmin && <VerifyComments />}
            <Profile setSuperAdmin={setSuperAdmin} />
          </Stack>
        </div>
      </div>

      {/* Drawer for Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List sx={{ width: 250 }} onClick={handleDrawerClose}>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about-us">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/comments">
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary="Comments" />
            </ListItemButton>
          </ListItem>

          {superAdmin && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/verify-comments">
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Verify Comments" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
