import axios from "axios";

const API_URL = "http://localhost:5000/api/categories/";

//get categories
const getCategory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const categoryService = {
  getCategory,
};

export default categoryService;
