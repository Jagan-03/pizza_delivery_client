import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/inventory";

export const getInventory = async () => {
    try {
        const { data } = await axios.get(SERVER_URL);
        return data; 
    } catch (error) {
        console.log(error);
    }
}

export const updateInventory = async (count) => {
    try {
        const { data } = await axios.patch(SERVER_URL, count);
        return data;
    } catch (error) {
        console.error(error);
    }
}