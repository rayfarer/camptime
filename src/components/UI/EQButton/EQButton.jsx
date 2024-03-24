import React from 'react';
import './EQButton.css'; // Make sure to import the CSS file

const EQButton = ({ onClick, label }) => {
    return (
        <button className="everquest-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default EQButton;