import React from 'react';
import './Styles/Layout.css'; // Updated import
import Header from './Components/Header';
import DataTable from './Components/DataTable';

function App() {
  return (
    <div className="AppContainer">
      <Header />
      <div className="DataTableContainer">
        <DataTable />
      </div>
      <p className='Footer'>Copyright 2024. All rights reserved.</p>
    </div>
  );
}

export default App;
