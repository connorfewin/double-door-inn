import React, { useState } from "react";
import "../Styles/Image.css"; // Ensure this CSS file is linked

const Image = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isImageVisible, setImageVisible] = useState(false);

    const handleImageClick = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    const handleImageLoad = () => {
        setImageVisible(true); // Image has loaded, trigger the visibility
    };

    return (
        <div className="ImageContainer">
            <img
                src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'}
                alt="Double Door Inn"
                className={`HeaderImage ${isImageVisible ? 'HeaderImageVisible' : ''}`}
                onClick={handleImageClick}
                onLoad={handleImageLoad}
            />
            <div
                className={`Overlay ${isOverlayVisible ? 'OverlayVisible' : ''}`}
                onClick={handleImageClick}
            >
                <div className="OverlayContainer">
                    <h2>About us</h2>
                    <p>We collected this data through blood, sweat, and tears. In fact, I developed carpal tunnel syndrome while writing this sentence.</p>
                </div>
            </div>
        </div>
    );
};

export default Image;
