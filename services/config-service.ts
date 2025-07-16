import axios from 'axios';

// Use local API in development (proxy) and external API in production
const baseURL = process.client && window.location.hostname === 'localhost' 
  ? '/api' 
  : 'http://api-ads.ahfwml.live';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Add request interceptor for CORS
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Response Error:', error.response.data);
      return Promise.reject(new Error(error.response.data?.message || 'Erro na resposta do servidor'));
    } else if (error.request) {
      // Request was made but no response received (CORS, network, etc.)
      console.error('Request Error:', error.request);
      return Promise.reject(new Error('Erro de conexão com o servidor. Verifique sua conexão ou entre em contato com o suporte.'));
    } else {
      // Something else happened
      console.error('Config Error:', error.message);
      return Promise.reject(new Error('Erro de configuração da requisição'));
    }
  }
);
