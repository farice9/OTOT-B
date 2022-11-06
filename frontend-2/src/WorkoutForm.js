import React from 'react'
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Stack from "@mui/material/Stack";
import apis from './api';
import Box from "@mui/material/Box";
import { FormControl, FormLabel, FormControlLabel } from '@mui/material';

export default function WorkoutForm() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("cardio");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: date,
      type: type,
      duration: duration,
      description: description
    };
    await apis.addWorkout(payload)
      .then(res => {
        alert("Workout added");
      })
      .catch((err) => {
        alert("Problem adding workout");
      })
  }

  return (
    <div align='center' style = {{padding: "3%"}}>
      <Box sx={{
        width: "fit-content",
        margin: "auto",
        border: 2,
        borderRadius: '15px',
        borderColor: '#de3f59',
        pt: 3,
        pb: 3,
        pl: 6,
        pr: 6
      }}>

      
        <Stack align='center' direction="row" spacing={4}>
          <FormControl sx={{height:100}}>
            <FormLabel align='left' id="workout-date-label">Date</FormLabel>
            <TextField 
              id="outline-required" 
              type="date" 
              variant="outlined" 
              required={true} 
              onChange ={handleDateChange}>
            </TextField>
          </FormControl>
          

          <FormControl>
            <FormLabel id="workout-type-label">Workout Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={type}
              onChange={handleTypeChange}
            >
              <FormControlLabel value="cardio" control={<Radio />} label="cardio" />
              <FormControlLabel value="strength" control={<Radio />} label="strength" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel align='left' id="workout-type-label">Duration</FormLabel>
            <TextField 
              variant='outlined' 
              margin="dense" 
              label="minutes" 
              id="duration" 
              require={true} 
              type="number" 
              onChange ={handleDurationChange}>
              sx = {{width:50, height:50}}
            </TextField>
          </FormControl>
          
          <FormControl>
            <FormLabel align='left' id="workout-description-label">Describe your workout</FormLabel>
            <TextField variant='outlined' multiline={true} minRows="1" maxRows="1" margin="dense" id="description" required={true} type="description" onChange ={handleDescriptionChange}></TextField>
          </FormControl>
          
        </Stack>
        <Box align='right' sx={{pt:1, pb:1}}>
            <Button color="secondary" size="small" variant="contained" onClick={handleSubmit}>
                Add workout
            </Button>
          </Box>
      </Box>

    </div>
  )
}
