// src/services/activityService.js

import axios from 'axios';

const API_URL = 'http://localhost:8082/api/activities';

const getAllActivities = async () => {
  return axios.get(API_URL);
  
};

const createActivity = async (activity) => {
  return axios.post(API_URL, activity);
  ;
};

const updateActivity = async (activity) => {
  return axios.put(`${API_URL}/${activity.id}`, activity);
  
};

const deleteActivity = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
};
