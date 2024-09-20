import React from "react";

const Image = () => {
    return (
        <img
          src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'}
          alt="Double Door Inn"
          className="HeaderImage"
        />
    );
}

export default Image;