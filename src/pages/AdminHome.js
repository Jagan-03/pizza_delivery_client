import React from "react";
import useInterval from 'use-interval';
import { getInventory } from "../controllers/inventory";

// Components
import AdminNav from "../components/AdminNav";
import Inventory from "../components/inventory";
import OrderDetails from "../components/orderDetails";

// Controllers
import { getCart } from "../controllers/cart";
import { getOrders, updateOrder } from "../controllers/orders";

const AdminHome = () => {

    const [inventory, setInventory] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [customers, setCustomers] = React.useState({});


    useInterval(() => {
        (async () => {  
            const orderDetails = await getOrders();
            const allorders = [];
            orderDetails.forEach(order => {
                order.orders.forEach(ord => allorders.push(ord));
            });
            setOrders(allorders);
            let customerNames = await getCart();
            let customerDetails = {};
            customerNames.forEach(customer => {
                customerDetails[customer._id] = customer.name;
            });
            setCustomers(customerDetails);
            const items = await getInventory();
            setInventory(items);

        })();
    }, 100);

    
    const updateOrderStatus = (order, status) => {
        updateOrder(order, status);
    }

    return (
        <div className="admin-home">
            <AdminNav />
            <div className="admin-dashboard container-fluid">
                <div className="row">
                    {/* Inventory */}
                    <Inventory inventory={inventory}/>

                    {/* Order stats */}
                    <OrderDetails orders={orders} updateOrderStatus={updateOrderStatus} customers={customers}/>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;

