import axios from "axios";

const instance = axios.create({
  baseURL: "https://project-one-be.onrender.com/api/v1",
});
export default instance;
