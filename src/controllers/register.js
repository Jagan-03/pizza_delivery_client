import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/register";

export const registerUser = (user) => {
    const response = axios.post(SERVER_URL, user);
    return response;
}
