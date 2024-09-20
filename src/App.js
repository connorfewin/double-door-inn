import React from 'react';
import './Styles/Layout.css';
import './Styles/Image.css';
import Header from './Components/Header';
import DataTable from './Components/DataTable';
import Profile from './Components/Profile';
import Image from './Components/Image';

function App() {
  return (
    <div className="AppContainer">
      <div className="ProfileContainer">
        <Profile /> 
      </div>
      <div className='HeaderContainer'>
        <Header />
      </div>  
      <div className='ImagePadding'>
        <Image />
      </div>    
      <div className="DataTableContainer">
        <DataTable />
      </div>
      <p className="Footer">Copyright 2024. All rights reserved.</p>
    </div>
  );
}

export default App;
