import React from 'react';
import './Styles/Layout.css';
import Header from './Components/Header';
import DataTable from './Components/DataTable';
function App() {
  return (
    <div className="AppContainer">
      <section>
        <div className="section-header">
          <Header />
        </div>
        <div className="section-content">
          <img src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'} alt="Double Door Inn" className="HeaderImage" />
        </div>
      </section>
      <section>
        <div className="DataTableContainer">
            <DataTable />
        </div>
        <p className="Footer">Copyright 2024. All rights reserved.</p>
      </section>
    </div>
  );
}


export default App;
