import React from 'react';
import './Styles/Layout.css';
import Header from './Components/Header';
import DataTable from './Components/DataTable';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="AppContainer">
      <section>
        <div className="section-header">
          <div className="ProfileContainer">
            <Profile /> 
          </div>
          <div className="HeaderContainer">
            <Header />
          </div>
        </div>
        <div className="section-content">
          <img src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'} alt="Double Door Inn" className="HeaderImage" />
        </div>
      </section>
      <section className='data-section'>
        <div className="DataTableContainer">
            <DataTable />
        </div>
        <div className='section-content'>
          <p className="Footer">Copyright 2024. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}


export default App;
