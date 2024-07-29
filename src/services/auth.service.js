import { useSelector } from 'react-redux';
import configs from '../configuration/config.js';
import httpService from './http.service.js';

class AuthService {
  static getCurrentUser = () => {
    const { user } = useSelector(store => store?.auth?.auth);
    return { ...user } ?? null;
  };

  static signUp = async ({ name, email, password }) => {
    if (!(name && email && password)) {
      throw new Error('Required registration parameter is missing.');
    }

    const url = `${configs.apiBaseUrl}/auth/register`;

    try {
      const response = await httpService.post(url, {
        name,
        email,
        password,
      });

      if (response?.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
    }
  };

  static signIn = async ({ email, password }) => {
    if (!(email && password)) {
      throw new Error('Required login parameter is missing.');
    }

    const url = `${configs.apiBaseUrl}/auth/login`;

    try {
      const response = await httpService.post(url, { email, password });

      if (response?.success) {
        return response;
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
    }
  };

  static logOut = async () => {
    const url = `${configs.apiBaseUrl}/auth/logout`;
    await httpService.post(url, null);
    localStorage.clear();
  };
}

export default AuthService;
