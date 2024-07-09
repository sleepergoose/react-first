import HttpService from './http.service';
import { apiBaseUrl } from '../constants/environment.jsx';

class ProductService {
  constructor() {
    this.#httpService = new HttpService();
  }

  #httpService;

  getPaginatedProducts = async (page, limit) => {
    return await this.#httpService.get(
      `${apiBaseUrl}/products/paginated?page=${page}&limit=${limit}`
    );
  };
}

export default ProductService;
