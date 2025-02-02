import React, { useState, useEffect } from "react";
import MobileAboutUs from "../Components/About Us/MobileAboutUs";

import "../Styles/Pages/AboutUsPage.css";

export default function AboutUs() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return <MobileAboutUs />;
    }

    return (
        <div className="AboutUsContainer">
            <div className="AboutUsContent">
                {/* First Section (Text Left, Image Right) */}
                <div className="AboutUsSection">
                    <div className="TextBlock">
                        <p>
                            This searchable list of over 10,500 nights of music in the Queen City is dedicated to Nick Karres and all the people who breathed life into the Double Door Inn day after day and night after night.
                        </p>
                        <p>
                            Compiling it was a labor of love that was sparked by my need to know what night I took my dad to see Buddy Guy at the Double Door (April 4, 1990).
                        </p>
                    </div>
                    
                    <img src={process.env.PUBLIC_URL + '/DoubleDoorInn.jpg'} alt="Double Door Inn" className="AboutUsImage RightImage" />
                </div>

                {/* Second Section (Image Left, Text Right) */}
                <div className="AboutUsSection Reverse">
                    
                <img src={process.env.PUBLIC_URL + '/GroupPhoto1.JPEG'} alt="Group 1" className="AboutUsImage RightImage" />
                    <div className="TextBlock">
                        <p>
                            At the screening of “Live from the Double Door Inn” at the Independent Picture House on December 22, 2023 (the 50th anniversary of the Double Door’s opening), I asked Nick if he had a list of bands that headlined the Double Door by date. He grinned and said he had boxes of source material if I wanted to call him after the holidays.
                        </p>
                    </div>
                </div>

                {/* Third Section (Text Left, Image Right) */}
                <div className="AboutUsSection">
                    <div className="TextBlock">
                        <p>
                            This list was compiled from Nick’s boxes of monthly music calendars with intermittent help from The Charlotte Observer Archives when Nick was missing a calendar. My friend, Connor Fewin, then took the list and designed and built this website honoring the legacy of 43 incredible years of “damn powerful music” and community at the Double Door Inn, 1218 Charlottetowne Avenue, Charlotte, North Carolina.
                        </p>
                    </div>
                    <img src={process.env.PUBLIC_URL + '/GroupPhoto2.jpg'} alt="Group 2" className="AboutUsImage LeftImage" />
                </div>
                <div className="TextBlock">
                <p>
                            However, despite our best efforts, the list is missing about 2,000 nights of music. If you have information that would help us add any missing bands and dates, please reach out to us at <strong><u>info@doubeldoormusic.com</u></strong>. We’d love to hear from you!
                        </p>
                        <p className="Signature">Keeping the Memories Alive,</p>
                        <p className="Signature">- John Hosmer</p>
                        <p className="Signature">P.S. Nick says to tell y’all hi.</p>
                </div>
            </div>
        </div>
    );
}
