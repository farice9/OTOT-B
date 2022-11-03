import express from 'express';
// import cors from 'cors';
import { addWorkout, getAllWorkout, getWorkoutByDate, 
    getWorkoutByType, updateWorkout, deleteWorkout } from './workout.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors({
//     origin: process.env.CORS_ORIGIN.split("|"),
//     credentials: true,
// }))
// app.use(cookieParser())

const router = express.Router()

//Set up mongoose connection
let mongoDB = process.env.NODE_ENV === "production" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

if (process.env.NODE_ENV === "test") {
    // Use temp storage for testing
    let memdb = await MongoMemoryServer.create();
    mongoDB = memdb.getUri();
} 

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.on('connected', function() {
    if (!(process.env.NODE_ENV === "test")) {
        console.log('MongoDB connected successfully')
    }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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

export { app };