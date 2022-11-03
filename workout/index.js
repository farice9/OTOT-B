import express from 'express';
// import cors from 'cors';
import { addWorkout, getAllWorkout, getWorkoutByDate, 
    getWorkoutByType, updateWorkout, deleteWorkout } from './workout.js';

const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors({
//     origin: process.env.CORS_ORIGIN.split("|"),
//     credentials: true,
// }))
// app.use(cookieParser())

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from workout'));
router.post('/addWorkout', addWorkout);
router.get('/getAllWorkout', getAllWorkout);
router.get('/getWorkoutByDate/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})', getWorkoutByDate);
router.get('/getWorkoutByType/:type', getWorkoutByType);
router.put('/updateWorkout', updateWorkout);
router.delete('/deleteWorkout', deleteWorkout);

router.get('*', (req, res) => {
    return res.status(404).json({message: 'Non-existing route'});
});

app.use('/api/workout', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(PORT, () => console.log(`workout listening on port ${PORT}`));