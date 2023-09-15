import axios from "axios";

// Tạo axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axiosClient;