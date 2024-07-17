import httpService from './http.service.js';
import { apiBaseUrl } from '../constants/environment.js';

class ProductService {
  static getPaginatedProducts = async (page, limit) => {
    return await httpService.get(
      `${apiBaseUrl}/products/paginated?page=${page}&limit=${limit}`
    );
  };

  static createProduct = async (product) => {
    return await httpService.post(`${apiBaseUrl}/products/`, product);
  };
}

export default ProductService;
