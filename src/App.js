import React from 'react';
import './Styles/Layout.css'; // Updated import
import Header from './Components/Header';
import DataTable from './Components/DataTable';

function App() {
  return (
    <div className="App">
      <Header />
      <DataTable />
    </div>
  );
}

export default App;
