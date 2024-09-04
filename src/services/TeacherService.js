// src/services/teacherService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/teachers';

const getAllTeachers = () => {
    return axios.get(API_URL);
};

const getTeacherById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createTeacher = (teacherData) => {
    return axios.post(API_URL, teacherData);
};

const updateTeacher = (id, teacherData) => {
    return axios.put(`${API_URL}/${id}`, teacherData);
};

const deleteTeacher = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const teacherService = {
    getAllTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
  };
  
  export default teacherService;