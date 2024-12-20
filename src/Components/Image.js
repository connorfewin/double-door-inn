import React, { useState, useEffect } from "react";
import "../Styles/Image.css";

const Image = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isImageVisible, setImageVisible] = useState(false);
    const [mainImageURL, setMainImageURL] = useState(process.env.PUBLIC_URL + '/DoubleDoorInn.jpg');

    // Preload images
    useEffect(() => {
        const imagesToPreload = [
            '/GroupPhoto1.JPEG',
            '/GroupPhoto2.jpg',
            '/DoubleDoorInn.jpg'
        ];

        imagesToPreload.forEach(image => {
            const img = document.createElement('img');
            img.src = process.env.PUBLIC_URL + image;
        });
    }, []);

    const handleImageClick = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    const handleImageLoad = () => {
        setImageVisible(true); 
    };

    const handleMiniImageClick = (URL) => {
        if(mainImageURL !== URL) {
            setTimeout(() => {
                setMainImageURL(process.env.PUBLIC_URL + URL); // Change main image URL
                setOverlayVisible(!isOverlayVisible);
            }, 200); // Delay to allow smooth fade-out effect
        } else {
            setOverlayVisible(!isOverlayVisible);
        }
    };

    return (
        <div className={`ImageContainer ${isOverlayVisible ? 'OverlayVisible' : ''}`}>
            <img
                src={mainImageURL}
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
                    <div className="ImageRow">
                        <img
                            src={process.env.PUBLIC_URL + '/GroupPhoto1.JPEG'}
                            alt="Group 1"
                            className="OverlayImage"
                            onClick={(e) => { e.stopPropagation(); handleMiniImageClick('/GroupPhoto1.JPEG'); }}
                        />
                        <img
                            src={process.env.PUBLIC_URL + '/GroupPhoto2.jpg'}
                            alt="Group 2"
                            className="OverlayImage"
                            onClick={(e) => { e.stopPropagation(); handleMiniImageClick('/GroupPhoto2.jpg'); }}
                        />
                        <img
                            src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'}
                            alt="The Stage"
                            className="OverlayImage"
                            onClick={(e) => { e.stopPropagation(); handleMiniImageClick('/DoubleDoorInn.jpg'); }}
                        />
                    </div>
                    <div className="ImageTextContainer" onClick={(e) => { e.stopPropagation(); handleMiniImageClick('/DoubleDoorInn.jpg'); }}>
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
                            However, despite our best efforts, the list is missing about 2,000 nights of music. If you have information that would help us add any missing bands and dates, please reach out to us at info@doubeldoormusic.com. We’d love to hear from you!
                        </p> 
                        <br />
                        <p>Keeping the Memories Alive,</p>
                        <p>- John Hosmer</p>
                        <p>P.S. Nick says to tell y’all hi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Image;
