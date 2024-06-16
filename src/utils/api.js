import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    // key: process.env.REACT_APP_API_KEY,
    key: import.meta.env.VITE_API_KEY,
  },
});

export default request;
