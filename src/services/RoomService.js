// src/services/roomService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/rooms';

const getAllRooms = () => {
    return axios.get(API_URL);
};

const getRoomById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createRoom = (roomData) => {
    return axios.post(API_URL, roomData);
};

const updateRoom = (id, roomData) => {
    return axios.put(`${API_URL}/${id}`, roomData);
};

const deleteRoom = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const roomService = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};

  export default roomService;