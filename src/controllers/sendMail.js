import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/sendMail";

export const sendMail = async (dat) => {
    try {
        const data = await axios.post(SERVER_URL, dat);
        return data;
    } catch (error) {
        console.error(error);
    }
}
