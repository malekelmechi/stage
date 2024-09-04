import axios from 'axios';

const API_URL = 'http://localhost:8082/api/room-constraints';

// Création des contraintes de salle
const createRoomConstraint = (teacherId, constraintData) => {
  return axios.post(`${API_URL}/${teacherId}`, constraintData);
};
// Récupérer toutes les salles
const getAllRooms = () => {
  return axios.get('http://localhost:8082/api/rooms'); // Remplacez cette URL par celle qui correspond à votre endpoint pour les salles
};

export default {
  createRoomConstraint,
  getAllRooms,
};
