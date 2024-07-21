import httpService from './http.service.js';
import { apiBaseUrl } from '../constants/environment.js';

class ProductService {
  static getPaginatedProducts = async (page, limit, sortOption = 'priceUp') => {
    return await httpService.get(
      `${apiBaseUrl}/products/paginated?page=${page}&limit=${limit}&sortOption=${sortOption}`
    );
  };

  static createProduct = async (product) => {
    return await httpService.post(`${apiBaseUrl}/products/`, product);
  };

  static getFiltersData = async () => {
    return await httpService.get(`${apiBaseUrl}/products/filters`);
  };
}

export default ProductService;
