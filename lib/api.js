const BASE_URL = 'https://next-ecommerce-api.vercel.app';

/**
 * Fetch products with pagination, sorting, and filtering by category.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} sort - Sorting order ('price_asc' or 'price_desc').
 * @param {string} category - Product category filter.
 * @param {string} searchQuery - Search query for product title.
 * @returns {Promise<Array>} - List of products.
 */
export const getProducts = async ({
  page = 1,
  limit = 20,
  sortBy = 'id',
  order = 'asc',
  category = '',
  search = ''
}) => {
  const skip = (page - 1) * limit;
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&category=${category}&search=${search}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return {
      products: data,
      total: data
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      total: 0
    };
  }
};

/**
 * Fetch a single product by ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} - The product details.
 */
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetch categories from the API.
 * @returns {Promise<Array>} - List of product categories.
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
