import React from 'react';
import './Styles/Layout.css';
import './Styles/Image.css';
import Header from './Components/Header';
import DataTable from './Components/DataTable';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="AppContainer">
      <div className="ProfileContainer">
        <Profile /> 
      </div>
      <div className='HeaderContainer'>
        <Header />
      </div>  
      <div className='ImageContainer'>
        <img
          src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'}
          alt="Double Door Inn"
          className="HeaderImage"
        />
      </div>    
      <div className="DataTableContainer">
        <DataTable />
      </div>
      <p className="Footer">Copyright 2024. All rights reserved.</p>
    </div>
  );
}

export default App;
