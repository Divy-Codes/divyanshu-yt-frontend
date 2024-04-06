import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    // key: process.env.REACT_APP_API_KEY,
    key: "AIzaSyBD4CyQHEfDBKeTp_O8LQ1V8hqhIt0-ywI",
  },
});

export default request;
