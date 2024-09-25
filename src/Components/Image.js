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
                    <p>
                        This searchable list of over 10,500 nights of music in the Queen City is dedicated to Nick Karres and all the people who breathed life into the Double Door Inn day after day and night after night.
                    </p>
                    <br />
                    <p>
                        Compiling it was a labor of love that was sparked by my need to know what night I took my dad to see Buddy Guy at the Double Door (April 4, 1990).
                    </p>
                    <br />
                    <p>
                        At the screening of “Live from the Double Door Inn” at the Independent Picture House on December 22, 2023 (the 50th anniversary of the Double Door’s opening), I asked Nick if he had a list of bands that headlined the Double Door by date. He grinned and said he had boxes of source material if I wanted to call him after the holidays.
                    </p>
                    <br />
                    <p>
                        This list was compiled from Nick’s boxes of monthly music calendars with intermittent help from The Charlotte Observer Archives when Nick was missing a calendar. My friend, Connor Fewin, then took the list and designed and built this website honoring the legacy of 43 incredible years of “damn powerful music” and community at the Double Door Inn, 1218 Charlottetowne Avenue, Charlotte, North Carolina.
                    </p>
                    <br />
                    <p>
                        However, despite our best efforts, the list is missing about 2,000 nights of music. If you have information that would help us add any missing bands and dates, please reach out to us at info@____. We’d love to hear from you!
                    </p>    
                </div>
            </div>
        </div>
    );
};

export default Image;
