import axios from 'axios';

const API_URL = 'http://localhost:8082/api/time-constraints'; // Notez le chemin corrigé

const createTimeConstraint = (constraint, teacherId) => {
  return axios.post(`${API_URL}/${teacherId}`, constraint); // Assurez-vous que l'URL est correcte
};

export default {
  createTimeConstraint,
};
