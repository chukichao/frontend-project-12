import axios from 'axios';

export default class ChannelsService {
  static async getChannels(token) {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  static async addChannel(token, channel) {
    const response = await axios.post('/api/v1/channels', channel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
