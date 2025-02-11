import React from 'react';
import DataTable from '../Components/DataTable';
import Image from '../Components/Image';
import '../Styles/Pages/Home.css';

function Home({ superAdmin }) {
  return (
    <div className="HomeContainer">
      <div className="ImageContainer">
        <Image />
      </div>
      <div className="DataTableContainer">
        <DataTable superAdmin={superAdmin} />
      </div>
    </div>
  );
}

export default Home;
