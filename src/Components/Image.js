import React, { useState } from "react";
import "../Styles/Image.css"; // Ensure this CSS file is linked

const Image = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isLoading, setLoading] = useState(true); // Track loading state

    const handleImageClick = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    const handleImageLoad = () => {
        setLoading(false); // Set loading to false once the image is loaded
    };

    return (
        <div className="ImageContainer">
            {/* Display the loading graphic while the image is loading */}
            {isLoading && (
                <div className="LoadingGraphic">
                    {/* Subtle loading graphic */}
                    <div className="Spinner"></div>
                </div>
            )}
            <img
                src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'}
                alt="Double Door Inn"
                className={`HeaderImage ${isLoading ? 'HiddenImage' : ''}`}
                onClick={handleImageClick}
                onLoad={handleImageLoad} // Handle when image finishes loading
            />
            {isOverlayVisible && (
                <div className="Overlay" onClick={handleImageClick}>
                    <div className="OverlayContainer">
                        <h2>About us</h2>
                        <p>We collected this data through blood, sweat, and tears. In fact, I developed carpal tunnel syndrome while writing this sentence.</p>
                    </div>                     
                </div>
            )}
        </div>
    );
};

export default Image;
