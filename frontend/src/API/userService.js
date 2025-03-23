import axios from 'axios';

export default class UserService {
  static async login(data) {
    const response = await axios.post('/api/v1/login', data);

    return response;
  }
}
