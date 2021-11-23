import axios from "axios";

export const getPrice = async () => {
    try {
        const { data } = await axios.get("https://pizza-delivery-jaganath.herokuapp.com/price");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getPizzas = async () => {
    try {
        const { data } = await axios.get("https://pizza-delivery-jaganath.herokuapp.com/pizzas");
        return data;
    } catch (error) {
        console.log(error);
    }
}