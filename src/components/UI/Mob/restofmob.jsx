{/* <Grid xs={9}>
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


</Grid>
</Grid> */}

{/* </Box> */ }