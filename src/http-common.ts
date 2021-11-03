import axios from "axios";

//For local testing with backend => BaseURL: "http://localhost:8000/api/",
export default axios.create({
  //baseURL: "https://61684451ba841a001727c6a2.mockapi.io/api/",
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});
