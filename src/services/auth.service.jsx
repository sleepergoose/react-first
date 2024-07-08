import { apiBaseUrl } from '../constants/environment.jsx';
import HttpService from '../services/http.service.jsx';

let instance = null;

class AuthService {
  constructor() {
    if (!instance) {
      this.#apiUrl = apiBaseUrl;
      this.#httpService = new HttpService();
      instance = this;
    } else {
      return instance;
    }
  }

  #httpService;
  #apiUrl;
  #authState = false;
  #currentUser = null;

  getAuthState = async () => {
    return this.#authState;
  };

  getCurrentuser = async () => {
    return this.#currentUser;
  };

  signUp = async ({ name, email, password }) => {
    if (!(name && email && password)) {
      throw new Error('Required registration parameter is missing.');
    }

    const url = `${this.#apiUrl}/auth/register`;

    try {
      const response = await this.#httpService.post(url, {
        name,
        email,
        password,
      });

      if (response?.success) {
        localStorage.setItem('accessToken', response.accessToken);
        this.#authState = true;
        this.#currentUser = response.user;
      } else {
        this.#authState = false;
      }
    } catch (error) {
      this.#authState = false;
    }
  };

  signIn = async ({ email, password }) => {
    if (!(email && password)) {
      throw new Error('Required login parameter is missing.');
    }

    const url = `${this.#apiUrl}/auth/login`;

    try {
      const response = await this.#httpService.post(url, { email, password });

      if (response?.success) {
        localStorage.setItem('accessToken', response.accessToken);
        this.#authState = true;
        this.#currentUser = response.user;
      } else {
        this.#authState = false;
      }
    } catch (error) {
      this.#authState = false;
    }
  };

  logOut = async () => {
    const url = `${this.#apiUrl}/auth/logout`;

    await this.#httpService.post(url, null);

    localStorage.removeItem('accessToken');
    this.#authState = false;
  };
}

export default AuthService;
