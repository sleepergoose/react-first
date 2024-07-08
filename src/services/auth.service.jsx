import { apiBaseUrl } from '../constants/environment.jsx';
import HttpService from '../services/http.service.jsx';

let instance = null;

class AuthService {
  constructor() {
    if (!instance) {
      this.#httpService = new HttpService();
      instance = this;
    } else {
      return instance;
    }
  }

  #httpService;

  getAuthState = () => {
    return !!localStorage.getItem('accessToken');
  };

  getCurrentuser = () => {
    return null;
  };

  signUp = async ({ name, email, password }) => {
    if (!(name && email && password)) {
      throw new Error('Required registration parameter is missing.');
    }

    const url = `${apiBaseUrl}/auth/register`;

    try {
      const response = await this.#httpService.post(url, {
        name,
        email,
        password,
      });

      if (response?.success) {
        localStorage.setItem('accessToken', response.accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
    }
  };

  signIn = async ({ email, password }) => {
    if (!(email && password)) {
      throw new Error('Required login parameter is missing.');
    }

    const url = `${apiBaseUrl}/auth/login`;

    try {
      const response = await this.#httpService.post(url, { email, password });

      if (response?.success) {
        localStorage.setItem('accessToken', response.accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
    }
  };

  logOut = async () => {
    const url = `${apiBaseUrl}/auth/logout`;
    await this.#httpService.post(url, null);
    localStorage.removeItem('accessToken');
  };
}

export default AuthService;
