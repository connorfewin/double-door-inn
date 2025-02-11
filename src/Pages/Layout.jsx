import React from 'react';
import { Outlet } from 'react-router-dom';
import '../Styles/Layout.css';
import Header from '../Components/Header';

function Layout({ superAdmin, setSuperAdmin }) {
  return (
    <div className="AppContainer">
      {/* Header always stays fixed at the top */}
      <div className="HeaderContainer">
        <Header superAdmin={superAdmin} setSuperAdmin={setSuperAdmin}/>
      </div>

      {/* Main content container for dynamic routes */}
      <div className="ContentContainer">
        <Outlet />
      </div>

      {/* Footer always at the bottom */}
      <p className="Footer">Copyright 2024. All rights reserved.</p>
    </div>
  );
}

export default Layout;
