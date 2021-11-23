import axios from "axios";

const SERVER_URL =  "https://pizza-delivery-jaganath.herokuapp.com/cart";

export const getCart = async () => {
    try {
        const { data } = await axios.get(SERVER_URL);
        return data; 
    } catch (error) {
        console.log(error);
    }
}

export const addCart = async (newItem) => {
    try {
        const { data } = await axios.post(SERVER_URL, newItem);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateCart = async (dat) => {
    try {
        const { data } = await axios.patch(SERVER_URL, dat);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = async (dat) => {
    try {
        const {data} = await axios.delete(SERVER_URL, {data : dat});
        return data;
    } catch (error) {
        console.log(error);
    }
}