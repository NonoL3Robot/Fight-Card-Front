import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
    });
  }

  async get(endpoint = '') {
    try {
      const response = await this.api.get(endpoint);
      return response.data.content;
    } catch (error) {
      console.error('Erreur lors du GET: ', error);
      throw error;
    }
  }

  async post(endpoint = '', objectToSave) {
    try {
      const response = await this.api.post(endpoint, objectToSave);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du POST !: ', error);
      throw error;
    }
  }

  async put(endpoint = '', objectToSave) {
    try {
      const response = await this.api.put(endpoint, objectToSave);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du PUT !: ', error);
      throw error;
    }
  }

  async delete(endpoint = '') {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du DELETE !: ', error);
      throw error;
    }
  }
}

export default ApiService;
