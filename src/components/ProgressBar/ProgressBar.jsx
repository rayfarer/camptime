import React from 'react';
import './ProgressBar.css'; // Import the CSS file for styling



const ProgressBar = ({ unluckiness }) => {
    const progressBarStyle = {
        width: `${unluckiness * 100}%`,
        backgroundColor: `rgba(255, ${255 - unluckiness * 255}, 0, 1)`, // Example color based on unluckiness
    };

    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={progressBarStyle}>
                <div className="progress-label">{(unluckiness * 100).toFixed(3)}</div>
            </div>
        </div>
    );
};

export default ProgressBar;