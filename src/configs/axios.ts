import axios from "axios";
import db_URI from "./db";
const instance = axios.create({
  baseURL: `${db_URI()}`,
});
export default instance;
