import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>CleanWaterCheck</h1>
            <nav>
                <a href="#report">Report Water Quality</a>
                <a href="#map">Interactive Map</a>
                <a href="#education">Education</a>
            </nav>
        </header>
    );
};

export default Header;