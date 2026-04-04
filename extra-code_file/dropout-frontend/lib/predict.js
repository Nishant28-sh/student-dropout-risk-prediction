import axios from 'axios';

export async function predictDropout(formData) {
  try {
    const payload = {};
    for (const [key, value] of Object.entries(formData)) {
      payload[key] = Number(value) || 0;
    }

    const response = await axios.post('/api/predict', payload);
    return response.data;
  } catch (error) {
    console.error('Error predicting dropout:', error);
    throw new Error(error.response?.data?.message || 'Failed to predict dropout risk. Please try again.');
  }
}
