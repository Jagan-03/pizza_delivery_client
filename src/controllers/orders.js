import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/orders";

export const getOrders = async () => {
    try {
        const { data } = await axios.get(SERVER_URL);
        return data; 
    } catch (error) {
        console.log(error);
    }
}

export const addOrders = async (newItem) => {
    try {
        const { data } = await axios.post(SERVER_URL, newItem);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateOrder = async (order, status) => {
    try {
        const data = await axios.patch(SERVER_URL, {order : order, status : status});
        return data;
    } catch (error) {
        console.error(error);
    }
}