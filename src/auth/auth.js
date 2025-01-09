import axios from "axios";

const API_URL = "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/auths";

// فانكشن تسجيل الدخول
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // هيكون فيه التوكن أو الـuser data
  } catch (error) {
    throw error.response.data; // هنا بيطلعلك ال errors اللي جاية من الـ API
  }
};

// فانكشن التسجيل
export const signup = async (
  name,
  email,
  phone,
  password,
  passwordConfirm,
  role
) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      phone,
      password,
      passwordConfirm,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
