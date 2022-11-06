import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, FormLabel, FormControlLabel } from '@mui/material';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Stack from "@mui/material/Stack";

import apis from './api';


const useStyles = makeStyles({
	boxWidth: {
		minWidth: "50%",
	},
	fontColor: {
		color: "black",
	},
	paper: {
		minWidth: "25%",
	},
});


export default function WorkoutEditDialog(props) {

  const classes = useStyles();

  const workoutInfo = props.workoutInfo;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(workoutInfo.date);
  const [type, setType] = useState(workoutInfo.type);
  const [duration, setDuration] = useState(workoutInfo.duration);
  const [description, setDescription] = useState(workoutInfo.duration);

  const handleClickOpen = () => {
    setDate(workoutInfo.date);
    setType(workoutInfo.type);
    setDuration(workoutInfo.duration);
    setDescription(workoutInfo.description);
    setOpen(true);
  };

  const handleClose = () => {
    setDate(workoutInfo.date);
    setType(workoutInfo.type);
    setDuration(workoutInfo.duration);
    setDescription(workoutInfo.description);
    setOpen(false);
  };

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
      _id: workoutInfo._id,
      date: date,
      type: type,
      duration: duration,
      description: description
    };
    await apis.updateWorkout(payload).then(res => {
      setOpen(false);
      alert("Workout succesfully updated.");
    }).catch( err => {
      alert("Problem updating workout. Check your input");
    })
  }
  
  return (
    <div>
      <div>
      <IconButton style={{ padding: 5 }} onClick = {handleClickOpen}>
        <CreateIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.paper}}>
        <div style ={{padding: "2%", width: 400}}>
        <DialogTitle id="form-dialog-title">Enter game info:</DialogTitle>
        <DialogContent >
          <Stack spacing={1}>
            <FormControl sx={{height:100}}>
              <FormLabel align='left' id="workout-date-label">Date</FormLabel>
              <TextField 
                id="outline-required" 
                type="date" 
                variant="outlined" 
                required={true}
                value={date.slice(0,10)}
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
                value={duration}
                onChange ={handleDurationChange}>
                sx = {{width:50, height:50}}
              </TextField>
            </FormControl>
            
            <FormControl>
              <FormLabel align='left' id="workout-description-label">Describe your workout</FormLabel>
              <TextField variant='outlined' multiline={true} minRows="2" maxRows="2" margin="dense" id="description" required={true} type="description" value={description} onChange ={handleDescriptionChange}></TextField>
            </FormControl>
          </Stack>

        </DialogContent>
        <br />
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained"  onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogActions>
        </div>
      </Dialog>
      </div>
    </div>
  );
}
