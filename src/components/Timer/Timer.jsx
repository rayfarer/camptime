import React, { useState, useRef, useEffect } from 'react';
import Countdown from 'react-countdown';
import wavUrl from '../../assets/clock.wav'
import laugh from '../../assets/icefreti_atk.wav'
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { tooltips } from '../../library/constants/content';  // Update the path based on your project structure


import './Timer.css'; // Import the CSS file for styling

const Timer = ({ initialTime }) => {
    const audioRef = useRef(null);
    const audioRef2 = useRef(null);

    const [time, setTime] = useState(initialTime * 1000); // Convert seconds to milliseconds
    const [isRunning, setIsRunning] = useState(false);
    const countdownApiRef = React.createRef();

    const playSound = () => {
        audioRef.current.play();
    };

    const playLaugh = () => {
        audioRef2.current.play();
    };

    const handleStart = () => {
        playSound()
        setIsRunning(true);
        countdownApiRef.current.start();
    };



    const handlePause = () => {
        setIsRunning(false);
        // Store the current remaining time before pausing
        setTime(countdownApiRef.current.getTime());
        countdownApiRef.current.pause();
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(initialTime * 1000);
        countdownApiRef.current.stop();
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            playLaugh()
        }

        document.title = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        // Render the countdown
        return (
            <div>
                <Tooltip title={tooltips.spawn_timer} placement="bottom">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <button onClick={handleStart} disabled={isRunning}>
                            Start
                        </button>
                        <div className="Timer">
                            {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                        </div>

                        {/* <button onClick={handlePause} disabled={!isRunning}>
                    Pause
                </button> */}
                        <button onClick={handleReset}>
                            Reset
                        </button>
                    </Stack>
                </Tooltip>
                <audio ref={audioRef} preload="auto">
                    <source src={wavUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
                <audio ref={audioRef2} preload="auto">
                    <source src={laugh} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    };

    return (
        <Countdown
            ref={countdownApiRef}
            autoStart={false}
            renderer={(props) => renderer(props, countdownApiRef.current)}
            date={Date.now() + initialTime}
        />
    );
};

export default Timer;