// src/services/groupService.js
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/groups';

const getAllGroups = () => {
    return axios.get(API_URL);
};

const getGroupById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createGroup = (groupData) => {
    return axios.post(API_URL, groupData);
};

const updateGroup = (id, groupData) => {
    return axios.put(`${API_URL}/${id}`, groupData);
};

const deleteGroup = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


   
const groupService = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};
  export default groupService;