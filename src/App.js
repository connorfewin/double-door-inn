import React, { useState } from 'react';
import './Styles/Layout.css';
import './Styles/Image.css';
import Header from './Components/Header';
import DataTable from './Components/DataTable';
import Profile from './Components/Profile';
import Image from './Components/Image';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import CommentCarousel from './Components/CommentCarousel';

// Configure Amplify
Amplify.configure(awsExports);

function App() {
  const [superAdmin, setSuperAdmin] = useState(false)

  return (
    <div className="AppContainer">
      <div className="ProfileContainer">
        <Profile setSuperAdmin={setSuperAdmin}/> 
      </div>
      <div className='HeaderContainer'>
        <Header />
      </div>  
      <div className='ImagePadding'>
        <Image />
      </div>
      <div className='CommentsContainer'>
        <CommentCarousel />
      </div>    
      <div className="DataTableContainer">
        <DataTable superAdmin={superAdmin}/>
      </div>
      <p className="Footer">Copyright 2024. All rights reserved.</p>
    </div>
  );
}

export default App;
