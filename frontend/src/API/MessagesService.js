import axios from 'axios';

export default class MessagesService {
  static async getMessages(token) {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
