import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/grid';
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function Weather() {
    const [weather, setWeather] = useState();

    const handleWeatherUpdate = async (e) => {
        const googleFunc_url = 'https://asia-southeast1-cs3219-otot-b-367606.cloudfunctions.net/taskb-function'
        await axios.get(googleFunc_url)
            .then(res => {
                console.log(res.data);
                setWeather(res.data);
                alert("Weather updated")
            })
            .catch((err) => {
                alert("Problem refreshing weather");
            })


    }

    if (weather === undefined) {
        return (
            <div align='center' style={{ padding: "3%" }}>
                <Typography variant="h5">Weather</Typography>
                <br />
                <Typography variant="h6">Refresh weather to receive update</Typography>

                <Box align="right" sx={{ pt: 2 }}>
                    <Button color="secondary" size="small" variant="contained" onClick={handleWeatherUpdate}>
                        Refresh weather
                    </Button>
                </Box>
            </div>

        )
    }


    return (
        <div align='center' style={{ padding: "3%" }}>
            <Typography variant="h5">Weather</Typography>
            <Box sx={{
                width: "fit-content",
                margin: "auto",
            }}>
                <Stack align='center' sx={{ pt: 2 }} direction="row" spacing={2}>
                    {weather.map((info) =>
                        <Box sx={{
                            width: "fit-content",
                            border: 1,
                            borderRadius: '15px',
                            borderColor: '#de3f59',
                            p: 2
                        }}>
                            <Stack spacing={1}>
                                <Typography variant="h6">{info.date}</Typography>
                                <div>
                                    {info.raining ? (
                                        <ThunderstormIcon fontSize='large' />
                                    ) : (
                                        <WbSunnyIcon />
                                    )
                                    }
                                </div>
                                <Box sx={{ width: 120 }}>
                                    <Typography variant="subtitle2">{info.forecast}</Typography>
                                </Box>

                            </Stack>
                        </Box>
                    )}
                </Stack>
            </Box>
            <Box align="right" sx={{ pt: 2 }}>
                <Button color="secondary" size="small" variant="contained" onClick={handleWeatherUpdate}>
                    Refresh weather
                </Button>
            </Box>

        </div>
    )
}
