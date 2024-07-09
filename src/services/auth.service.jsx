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
    return !!localStorage.getItem('user');
  };

  getCurrentUser = () => {
    const userRawString = localStorage.getItem('user');
    return userRawString ? JSON.parse(userRawString) : null;
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
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
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
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
    }
  };

  logOut = async () => {
    const url = `${apiBaseUrl}/auth/logout`;
    await this.#httpService.post(url, null);
    localStorage.clear();
  };
}

export default AuthService;
