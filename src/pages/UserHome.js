import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import useInterval from 'use-interval';

// components
import Navbar from "../components/UsersNav";
import PizzaCard from "../components/PizzaCard";
import CustomForm from "../components/CustomForm";

// controllers
import { getPrice, getPizzas } from "../controllers/pizzaDetails";
import { getCart, updateCart, addCart } from "../controllers/cart";
import { getOrders, addOrders } from "../controllers/orders";
import { getInventory, updateInventory } from "../controllers/inventory"; 
import { sendMail } from "../controllers/sendMail"; 

const UserHome = ({match}) => {
  const [clearForm, setClearForm] = React.useState(false);
  const [pizaas, setPizaas] = React.useState([]);
  const [priceList, setPriceList] = React.useState({});
  const [inventory, setInventory] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [cartVarient, setCartVarient] = React.useState("");
  const [total, setTotal] = React.useState(0);
  

  
  
  React.useEffect(() => {
    (async () => {
      const price = await getPrice();
      setPriceList(price);
      const pizaas = await getPizzas();
      setPizaas(pizaas);
      const stock = await getInventory();
      setInventory(stock);
    })();
    
    let modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

  }, []);

  useInterval(() => {
    (async () => {
      const orderDetails = await getOrders();
      const userOrders = orderDetails.filter(user => user._id === match.params.id);
      setOrders(userOrders[0].orders);
      const items = await getCart();
      const userCart = items.filter(item => item._id === match.params.id);
      setCart(userCart[0].cart);
      
    })();
  }, 1000)

  React.useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [cart]);

  const pizaa = useFormik({
    initialValues: {
      base: "",
      sauce: "",
      cheese: "",
      veggies: [],
      meat: [],
      price: 0,
    },
    onSubmit: (values) => {
      let customPizza = {
        ...values,
        name: `Custom Order`,
        quantity: 1, 
        user_id : match.params.id
      };
      // setCart([...cart, customPizza]);
      addCart(customPizza);
      handleCustom(false);
    },
  });

  const handleCustom = (data) => {
    // Get the modal
    var modal = document.getElementById("myModal");
    if (data) modal.style.display = "block";
    else modal.style.display = "none";
    pizaa.setValues({
      base: "",
      sauce: "",
      cheese: "",
      veggies: [],
      meat: [],
      price: 0,
    });
    setClearForm(!clearForm);
  };

  const addItem = (newItem) => { 
    let items = [...cart];
    let inCart = false;
    items.forEach((item) => {
      if (item.name === newItem.name) {
        inCart = true;
        item.quantity += 1;
      }
    });
    if (!inCart) {
      // setCart([...items, {...newItem, quantity : 1}]);
      addCart({...newItem, quantity : 1, user_id : match.params.id});
    } else {
      // setCart(items);
      updateCart({id : match.params.id, items : items});
    }
    
  };
  const deleteItems = (item) => {
    let items = [...cart];
    let hasZero = false;
    items.forEach((ite, i) => {
      if (ite.name === item.name) {
        ite.quantity = ite.quantity - 1;
      }
      if (ite.quantity === 0) hasZero = true;
    });
    if (!hasZero) {
      // setCart([...items]);
      updateCart({id : match.params.id, items : items});
    } else {
      const newList = items.filter(item => item.quantity !== 0);
      updateCart({id : match.params.id, items : newList});
    }
  };

  const handleCart = (data, varient) => {
    if (data) document.getElementById("cart").style.width = "350px";
    else document.getElementById("cart").style.width = "0";
    setCartVarient(varient);
  };

  const displayRazorPay = async () => {
    try {
      const { data } = await axios.get(`https://pizza-delivery-jaganath.herokuapp.com/razorpay/${total}`);

      const options = {
        key: "rzp_test_2wjXim3nGQG8ph",
        amount: data.amount,
        currency: data.currency,
        name: "Pizza house",
        description: "Thanks for Choosing Pizza house.",
        image: "/images/pizza.png",
        order_id: data.id,
        handler: function (response) {
          // Updating orders
          addOrders({name : `Order ${orders.length + 1}`, items : cart, price : total, status : "Order pending", user_id : match.params.id});
          updateCart({id : match.params.id, items : []});
          // Inventory Update
          let count = {};
            cart.forEach(item => {
                let dum = [item.base, item.sauce, item.cheese, ...item.veggies, ...item.meat];
                dum.forEach(items => {
                    if(count[items]) count[items] += 1;
                    else count[items] = 1;
                })
            });
            let inventoryItems = [...inventory];
            inventoryItems.forEach(item => {
                if(count[item.name]) item.quantity = item.quantity - count[item.name];
            });
            updateInventory(count);
            setInventory(inventoryItems);

            Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));
            const belowThreshold = Object.filter(inventoryItems, ([item, quantity]) => quantity < 20); 
            triggerMail(belowThreshold);

          handleCart(false);
          alert("Hurraayyy!!! Order placed....");
        },
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  const triggerMail = async (belowThreshold) => {
      try {
        if(belowThreshold.length > 0) {
          belowThreshold.forEach(async item => {
            await sendMail(item);
          })
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="user-home pb-5">
      <Navbar cart={cart} orders={orders} cartVarient={cartVarient} handleCart={handleCart} />
      <div className="d-flex align-items-center justify-content-center ps-3 px-3">
        <div className="dummy border-bottom flex-fill m-2"></div>
        <h3 className="display-6 fw-bold text-light text-center m-2">
          Our varieties
        </h3>
        <div className="dummy border-bottom h-100 flex-fill m-2"></div>
      </div>
      <div className="row">
        {pizaas.map((pizaa) => {
          return (
            <div className="col-md-4 pizzas" key={pizaa.pos}>
              <PizzaCard pizzaDetails={pizaa} addItem={addItem} />
            </div>
          );
        })}
      </div>

        {/* Cart & Order */}
      <div id="cart" className="cart d-flex flex-column">
        <div className="cart-head d-flex w-100 p-3 justify-content-between align-items-center">
          <h3>{cartVarient === "items" ? "Cart items" : "Your Orders"}</h3>
          <button className="btn btn-danger" onClick={() => handleCart(false)}>
            <i className="fas fa-times fa-2x"></i>
          </button>
        </div>
        <div
          className={`cart-body d-flex flex-fill flex-column w-100 p-3 ${
            cart.length === 0 && orders.length === 0? "flex-fill align-items-center justify-content-center" : ""}`}
        > 
        {cartVarient === "items" ? (cart.length === 0 ? (
            <div className="w-100 text-center">
              <i className="fas fa-shopping-cart fa-5x mb-3"></i>
              <h3>Your Cart is empty</h3>
            </div>
          ) : (
            cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex w-100 border-bottom justify-content-between align-items-center mb-3"
                >
                  <h6>
                    {item.name} <br />{" "}
                    <span className="cart-qty">Qty : {item.quantity}</span>{" "}
                  </h6>
                  <div>
                    <p className="price m-0 p-0">₹ {item.price * item.quantity}</p>
                    <button
                      className="btn btn-link"
                      onClick={() => deleteItems(item)}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
              );
            })
          )) : (orders.length === 0 ? (
            <div className="w-100 text-center">
              <i className="fas fa-pizza-slice mb-3" />
              <h3>No Orders</h3>
            </div>
          ) : ( <div>

            {orders.map((order, index) => {
              if(order.status !== "Sent for delivery") {

              return (
                <div
                  key={index}
                  className="order d-flex w-100 border-bottom justify-content-between align-items-center mb-3 p-2"
                >
                  <p className="m-0 p-0">
                    <span className="fw-bold">{order.name}</span> <br />{" "}
                    <span className="cart-qty">Qty : {order.items.length}</span><br />{" "}
                    <span>Order status : <span className={`${order.status === "Order pending" ? "text-danger" : order.status === "In the kitchen" ? "text-warning" : order.status === "Sent for delivery" ? "text-success" : ""}`}>{order.status}</span></span>
                  </p>
                  <div>
                    <p className="price m-0 p-0">₹ {order.price}</p>
                  </div>
                </div>
              ); 
              } else return <div key={index}></div>
            }) }
            {orders.map((order, index) => {
              if(order.status === "Sent for delivery"){
                return <div
                  key={index}
                  className="order d-flex w-100 border-bottom justify-content-between align-items-center mb-3 p-2"
                >
                  <p className="m-0 p-0">
                    <span className="fw-bold">{order.name}</span> <br />{" "}
                    <span className="cart-qty">Qty : {order.items.length}</span><br />{" "}
                    <span>Order status : <span className={`${order.status === "Order pending" ? "text-danger" : order.status === "In the kitchen" ? "text-warning" : order.status === "Sent for delivery" ? "text-success" : ""}`}>{order.status}</span></span>
                  </p>
                  <div>
                    <p className="price m-0 p-0">₹ {order.price}</p>
                  </div>
                </div>
              } else return <div key={index}></div>
            })}
          </div>
          ))}
        </div>

        
        {cartVarient === "items" ? (cart.length > 0 ? (
          <div className="checkout d-flex w-100 p-3 flex-column">
            <div className="d-flex w-100 border-top pt-3 justify-content-between align-items-center mb-3">
              <h6>Total Amount</h6>
              <div>
                <p className="price m-0 p-0">₹ {total}</p>
              </div>
            </div>
            <button className="btn btn-primary w-100" onClick={displayRazorPay}>
              Checkout
            </button>
          </div>
        ) : (
          <></>
        )) : (<></>)}
      </div>

      <div
        id="custom"
        className="custom d-flex align-items-center justify-content-center"
      >
        <button
          className="btn btn-danger custom-order"
          onClick={() => handleCustom(true)}
        >
          {/* <i className="fas fa-plus fa-2x text-white"></i> */}
          Custom order
        </button>
      </div>
      <div id="myModal" className="modal">
        <div className="modal-content d-flex">
          <div className="modal-header">
            <h2 className="text-dark">Make your own pizza!</h2>
            <span
              className="close text-end"
              onClick={() => handleCustom(false)}
            >
              &times;
            </span>
          </div>

          <div className="modal-body">
            <CustomForm
              pizaa={pizaa}
              clearForm={clearForm}
              priceList={priceList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
