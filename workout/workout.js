import WorkoutModel from './model/workout-model.js'
import mongoose from 'mongoose';
import 'dotenv/config'

export async function addWorkout(req, res) {
    try {
        let { date, type, duration, description } = req.body;

        // Verify input
        if (!(date && type && duration && description)) {
            return res.status(400).json({message: 'Missing/wrong entry!'});
        }
        
        if (!(type == 'cardio' || type == 'strength')) {
            return res.status(400).json({message: 'Wrong training type input!'});
        }

        if (date == 'today') {
            date = new Date();
            date.setUTCHours(0, 0, 0, 0);
            console.log(date);
        } else {
            date = new Date(date);
        }

        if (description.trim().length === 0) {
            return res.status(400).json({message: 'Workout description is empty!'});
        }

        // Rejects the entry if the exact same input for all fields are inputted
        if (await WorkoutModel.findOne({date, type, duration, description})) {
            return res.status(400).json({message: 'Logging failed. The exact same entry is found'});
        }

        // Create the workout entry
        const resp = await WorkoutModel.create({date, type, duration, description});

        if (resp.err) {
            throw resp.err;
        } else {
            console.log(`Logged the ${duration} minutes ${type} workout on ${date.toLocaleDateString()}`)
            return res.status(201).json({message: `Logged the ${duration} minutes ${type} workout on ${date.toLocaleDateString()}`})
        }

    } catch (err) {
        console.log(`Error: ${err}`)

        if (err instanceof mongoose.Error.CastError) {
            return res.status(400).json({message: 'Input is invalid!'})
        } else if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({message: `Invalid duration input. ${err}`})
        }

        return res.status(500).json({message: 'Internal server error when logging workout! :('});
    }
}

export async function getAllWorkout(req, res) {
    try {
        const workout = await WorkoutModel.find();

        return res.status(200).json(workout);
    } catch (err) {
        console.log(`Error: ${err}`);

        return res.status(500).json({message: 'Internal server error when retrieving all workout!'})
    }
}

export async function getWorkoutByDate(req, res) {
    try {
        let date = req.params.year.concat("-", req.params.month, "-", req.params.day);
        date = new Date(date);
        const workout = await WorkoutModel.find({date: date});

        return res.status(200).json(workout);
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({message: `Internal server error when retrieving workout on ${date}!`})
    }
}

export async function getWorkoutByType(req, res) {
    try {
        const type = req.params.type;

        if (!(type == 'cardio' || type == 'strength')) {
            return res.status(400).json({message: 'Wrong training type selected!'});
        }

        const workout = await WorkoutModel.find({type: type});

        return res.status(200).json(workout);
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({message: `Internal server error when retrieving workout on ${date}!`})
    }
}

export async function updateWorkout(req, res) {
    try {
        let { _id, date, type, duration, description } = req.body;

        // Verify input
        if (!(_id && date && type && duration && description)) {
            return res.status(400).json({message: 'Missing/wrong entry!'});
        }

        date = new Date(date);

        const workoutUpdated = await WorkoutModel.findByIdAndUpdate(
            _id,
            {date: date, type: type, duration: duration, description: description},
            {new: true, runValidators: true, context:'query'}
        );
        
        if (workoutUpdated) {
            console.log(`Workout ${_id} updated: ${workoutUpdated}`)
            return res.status(201).json({message: 'Workout details updated!', newWorkoutDetail: workoutUpdated});
        }

        return res.status(400).json({message: 'Workout not found!'});

    } catch (err) {
        console.log(`Error: ${err}`);

        if (err instanceof mongoose.Error.CastError) {
            return res.status(400).json({message: 'Invalid input.'})
        } else if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({message: `Invalid input. ${err}`})
        }

        return res.status(500).json({message: `Internal server error when updating workout`})
    }
}

export async function deleteWorkout(req, res) {
    try {
        const _id = req.params.id;

        const resp = await WorkoutModel.findByIdAndDelete(_id)

        if (resp) {
            console.log(`Deleted workout ${_id}`)
            return res.status(200).json({message: `Workout record deleted`})
        }

        return res.status(400).json({message: 'Workout not found!'});
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: `Internal server error when updating workout`})
    }
}
