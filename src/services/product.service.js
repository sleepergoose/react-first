import httpService from './http.service.js';
import configs from '../configuration/config.js';

class ProductService {
  static getPaginatedProducts = async (page, limit, sortOption = 'priceUp') => {
    return await httpService.get(
      `${configs.apiBaseUrl}/products/paginated?page=${page}&limit=${limit}&sortOption=${sortOption}`
    );
  };

  static createProduct = async (product) => {
    return await httpService.post(`${configs.apiBaseUrl}/products/`, product);
  };

  static getFiltersData = async () => {
    return await httpService.get(`${configs.apiBaseUrl}/products/filters`);
  };
}

export default ProductService;
