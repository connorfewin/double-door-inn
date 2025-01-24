import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Home from './Pages/Home';
import CommentsPage from './Pages/CommentsPage';
import Layout from './Pages/Layout';

import './Styles/global.css'
import UnverifiedCommentsPage from './Pages/UnverifiedCommentsPage';

Amplify.configure(awsExports);

function App() {
  const [superAdmin, setSuperAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all routes */}
        <Route element={<Layout superAdmin={superAdmin} setSuperAdmin={setSuperAdmin} />}>
          <Route 
            path="/" 
            element={<Home superAdmin={superAdmin} />} 
          />
          <Route 
            path="/comments" 
            element={<CommentsPage />} 
          />
          <Route 
            path="/verify-comments"
            element={<UnverifiedCommentsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
