import React from 'react';
import './HomePage.css';

const HomePage = () => {
    const imageUrl = 'https://marketing-assets.wheniwork-production.com/2020/02/03102804/Scheduling-hero-shifts.svg'; // Replace with the actual URL of the image

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>The Shift Scheduling App<br></br> that makes shift <br></br>management easy.</h1>
                </div>
                <div className="hero-image">
                    <img src={imageUrl} alt="Shift management app" />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
