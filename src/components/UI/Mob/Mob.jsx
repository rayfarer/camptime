import React, { useRef, useState, useMemo, useEffect } from 'react';
import EQButton from '../EQButton/EQButton';
import Timer from '../../Timer/Timer'; // Adjust the path based on your project structure
import ProgressBar from '../../ProgressBar/ProgressBar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from '@mui/material/Tooltip';
import DiceIcon from '@mui/icons-material/Casino';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../NavBar/NavBar';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


import logo from '../../../assets/camptime_logo.png'
import necropet from '../../../assets/necropet.gif'

import { getFunctions, httpsCallable } from 'firebase/functions'


import { luckinessLevels, tooltips, text } from '../../../library/constants/content';  // Update the path based on your project structure
export default function Mob() {

    const [killCount, setKillCount] = useState(0);
    const [unluckiness, setUnluckiness] = useState(0);
    const [unluckinessText, setUnluckinessText] = useState(luckinessLevels['0-10'])
    const [lootSelection, setLootSelection] = React.useState(null);
    const [currentMob, setCurrentMob] = React.useState("");
    const [mob, setMob] = useState(null);
    const [spawnTimer, setSpawnTimer] = React.useState(1200)

    const updateUnluckiness = (killCount, lootSelection) => {
        if (mob && lootSelection) {
            console.log(lootSelection.name); // Assuming lootSelection is the object from the mob.loot array
            let dropRate = lootSelection.chance / 100;
            console.log("chance", lootSelection.chance);
            console.log("drop rate", dropRate);

            const probabilityNoDrop = Math.pow(1 - dropRate, killCount);
            const calculatedUnluckiness = 1 - probabilityNoDrop;
            setUnluckiness(calculatedUnluckiness);
        }
    };


    const increaseKillCount = () => {
        setKillCount(killCount + 1);
        updateUnluckiness(killCount + 1, lootSelection);
    };

    const decreaseKillCount = () => {
        if (killCount > 0) {
            setKillCount(killCount - 1);
            updateUnluckiness(killCount - 1, lootSelection);
        }
    };

    const updateCounter = () => {
        document.getElementById('counter').innerText = killCount;
    };


    const renderLuckinessText = (unluckiness) => {
        const intValue = Math.round(unluckiness * 100);

        if (isNaN(intValue) || intValue < 0 || intValue > 100) {
            return "Invalid unluckiness value.";
        }

        const luckinessKeys = Object.keys(luckinessLevels);

        for (const key of luckinessKeys) {
            const [lower, upper] = key.split('-').map(Number);

            if (intValue >= lower && intValue <= upper) {
                return luckinessLevels[key];
            }
        }

        return "Invalid unluckiness value.";
    };

    const handleRadioChange = (event) => {
        const selectedName = event.target.value;

        // Find the selected loot item by name
        const selectedLoot = mob.loot.find(item => item.name === selectedName);

        // If the selected loot item is found, update the state
        if (selectedLoot) {
            console.log(selectedName);
            setLootSelection(selectedLoot);
            console.log(killCount);
            console.log("Current selection is", selectedName);
            updateUnluckiness(killCount, selectedLoot);
        } else {
            console.error(`Loot item with name "${selectedName}" not found.`);
        }
    };

    const fetchMobData = async (mobId) => {
        try {
            const getMobCallable = httpsCallable(getFunctions(), 'queryRDS');
            const result = await getMobCallable({ id: mobId });
            console.log(result.data.mob)
            setMob(result.data.mob);  // Assuming the callable function returns the mob data
            setLootSelection(result.data.mob.loot[0])
            setUnluckiness(result.data.mob.loot[0].chance / 100)
            setSpawnTimer(result.data.mob.spawnTimer)
        } catch (error) {
            console.error('Error fetching mob data:', error);
        }
    };

    const handleSearch = async (value) => {
        setCurrentMob(value);
        alert("Mob is " + value)

        fetchMobData(value);
    };


    return (
        <div style={{ textAlign: 'center' }}> {/* Removed width */}
            <div style={{ backgroundColor: 'orange', color: 'white', height: '50px', position: 'absolute', top: 0, left: 0, right: 0 }}>
                <NavBar search={handleSearch} spawnTimer={spawnTimer} />
            </div>

            {mob ?
                <div>
                    <div style={{ width: '50%', height: '100vh', float: 'left', position: 'fixed' }}>
                        <br></br><br></br>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={mob.avatar} alt={mob.name} />
                    </div>
                    <div style={{ marginTop: '200px', width: '50%', height: '100vh', float: 'right' }}>
                        <div>
                            <Link rel="noopener" target="_blank" href={`https://www.takproject.net/allaclone/npc.php?id=${mob.id}`} underline="none"><Typography variant="h5">{mob.name}</Typography></Link>
                            <Link rel="noopener" target="_blank" href={`https://www.takproject.net/allaclone/npc.php?id=${mob.id}`} underline="none"><Typography variant="body2"><i>Placeholder: {mob.placeholder} - {100 - mob.spawnChance}%</i></Typography></Link>
                            <br></br>
                        </div>
                        <div style={{ width: '250px', margin: 'auto', padding: '10px' }}>
                            <div style={{ width: '180px', margin: 'auto' }}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="body2"><strong>Unluckiness Meter</strong></Typography>
                                    <Tooltip title={tooltips.unluckiness_meter} placement="right">
                                        <DiceIcon sx={{ fontSize: 14 }} />
                                    </Tooltip>
                                </Stack>
                            </div>
                            <ProgressBar unluckiness={unluckiness} />
                            <Typography variant="caption">{renderLuckinessText(unluckiness)}</Typography>
                            <br />
                            <p><strong>Kill Count</strong></p>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <IconButton size="large" color="error" onClick={decreaseKillCount} aria-label="remove">
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                    sx={{ width: '70px' }}
                                    alignItems="center"
                                    id="outlined-number"
                                    type="number"
                                    onChange={(event) => {
                                        setKillCount(Number(event.target.value));
                                        updateUnluckiness(event.target.value, lootSelection)

                                    }}
                                    value={killCount}
                                />
                                <IconButton size="large" color="success" onClick={increaseKillCount} aria-label="add">
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        </div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Which item are you camping?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={mob.loot[0].name}
                                name="radio-buttons-group"
                            >
                                {mob.loot.map((element, index) => (
                                    <FormControlLabel
                                        key={element.id}
                                        value={element.name}
                                        onChange={handleRadioChange}
                                        control={<Radio />}
                                        label={<Typography variant="body2">
                                            <Link rel="noopener" target="_blank" href={`https://www.takproject.net/allaclone/item.php?id=${element.id}`} underline="none">
                                                {element.name}
                                            </Link>
                                            - <Tooltip title={tooltips.drop_rate} placement="right">{element.chance}%</Tooltip>
                                        </Typography>}
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 14,
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                            <button>Save Camp Progress</button>

                        </FormControl>
                    </div>
                </div >
                :
                <div id="error-page" style={{ display: 'block', width: '600px', paddingTop: '200px', margin: 'auto', boxSizing: 'border-box' }}>
                    <h1>What slay ye?</h1>
                    <img width='200px' src={necropet} />
                    {/* <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: text.welcome }} />
                    */}
                    <div>
                        <TextField
                            id="input-with-icon-textfield"
                            fullWidth
                            placeholder="Search by Mob Name or Allalcone ID"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div style={{ backgroundColor: 'cornsilk', marginTop: '15px', border: '1px solid #ccc', padding: '10px 15px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: text.takp }} />
                    </div>
                </div>
            }
        </div >
    )
};