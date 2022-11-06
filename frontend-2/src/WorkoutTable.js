import React, {useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WorkoutEditDialog from './WorkoutEditDialog';
import Box from "@mui/material/Box";

import apis from './api';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const StyledTableCell = withStyles({
  root: {
    color: "white"
  }
})(TableCell);

export default function WorkoutTable() {

  const classes = useStyles();

  const [workoutList, setWorkoutList] = useState(); 

  const handleEdit = (id) => {
    alert("editing")
  }

  const handleDelete = async (id) => {
    let isMounted = true;
    
    async function deleteWorkout() {
      
      await apis.deleteWorkout(id)
      .then(workout => {
        alert("Workout succesfully deleted.");
      })
      .catch((err) => {
        alert("Problem deleting workout");
      })
    }
    deleteWorkout();
    console.log(workoutList);
    return () => { isMounted = false };
  }

  useEffect(() => {
    let isMounted = true;  
    async function getAllWorkout() {
      await apis.getAllWorkout().then(workout => {
        if (isMounted) setWorkoutList(workout.data);
    })}
    getAllWorkout();
    return () => { isMounted = false };
  }, [workoutList])

  if (workoutList === undefined) {
    return (
        <div align='center'>
        <br />
        <Typography variant="h4">Still loading...</Typography>
        </div>
    )
  }

  return (
    <div>
      <Box sx={{
        margin: "auto",
        pl: 6,
        pr: 6,
        pb: 10
      }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} sx={{margin:'10'}} aria-label="simple table">
          <TableHead style = {{backgroundColor: "#de3f59"}}>
            <TableRow>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Duration (min)</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workoutList.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" style={{width:100}} scope="row">{row.date.slice(0,10)}</TableCell>
                <TableCell align="left" style={{width:100}}>{row.type}</TableCell>
                <TableCell align="left" style={{width:100}} >{row.duration}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right" style={{width:50}}>
                  <div>
                    <span style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      float: "left",
                      width: 100
                    }}>
                      <WorkoutEditDialog workoutInfo = {row}/>
                      &emsp;
                      <IconButton style={{ padding: 5 }} onClick = {() => handleDelete(row._id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </div>
  );
}
