
import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/login";

export const loginUser = async (user) => {
    const response = await axios.post(SERVER_URL, user);
    return response;
}

