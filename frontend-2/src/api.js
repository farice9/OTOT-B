import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/workout',
})


export const addWorkout = payload => api.post(`/addWorkout`, payload)
export const getAllWorkout = () => api.get(`/getAllWorkout`)
export const getWorkoutByDate = date => api.get(`/getWorkoutByDate/${date}`)
export const getWorkoutByType = type => api.get(`/getWorkoutByType/${type}`)
export const updateWorkout = payload => api.put(`/updateWorkout`, payload)
export const deleteWorkout = payload => api.delete(`/deleteWorkout`, payload)

export const getGameById = id => api.get(`/game/${id}`)

const apis = {
    addWorkout,
    getAllWorkout,
    getWorkoutByDate,
    getWorkoutByType,
    updateWorkout,
    deleteWorkout
}

export default apis