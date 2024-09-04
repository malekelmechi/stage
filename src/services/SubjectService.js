// src/services/subjectService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/subjects';

const getAllSubjects = () => {
    return axios.get(API_URL);
};

const getSubjectById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createSubject = (subjectData) => {
    return axios.post(API_URL, subjectData);
};

const updateSubject = (id, subjectData) => {
    return axios.put(`${API_URL}/${id}`, subjectData);
};

const deleteSubject = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


const subjectService = {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject,
};
  
  export default subjectService;