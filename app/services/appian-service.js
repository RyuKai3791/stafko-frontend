import axios from 'axios';

const APPian_BASE_URL = 'https://tudominio.appiancloud.com/suite/webapi';
const APPIAN_USER = 'API';

const token = 'AUTH_API_TOKEN';

const appianService = axios.create({
  baseURL: APPian_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

export const getData = async () => {
  try {
    const response = await appianService.get('/endpoint');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Appian', error);
    throw error;
  }
};
