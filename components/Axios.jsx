import axios from "axios";

const instance = axios.create({
    baseURL:'https://us-central1-clone-55cfd.cloudfunctions.net/api'
    //'http://localhost:5001/clone-55cfd/us-central1/api' //The API cloud function URL
});

export default instance;