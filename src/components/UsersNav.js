import React from "react";


const Navbar = ({cart, orders, cartVarient, handleCart}) => {

  const [cartQty, setCartQty] = React.useState(0);

  React.useEffect(() => {
    let cartSum = 0;
    cart.forEach(item => cartSum += item.quantity); 
    setCartQty(cartSum);
  }, [cart])

  return (
    <div className="usersNav p-3 sticky-top">
      {/* // <!-- Navbar --> */}
      <nav className="navbar">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
            <h3 className="text-light"><i className="fas fa-pizza-slice text-danger"></i> Pizza house</h3>
          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
          <button
                className="btn btn-secondary"
                type="button"
                onClick={() => handleCart(true, "items")}
              >
                🛒 Cart{" "}
                <span className="badge bg-dark rounded-circle">
                  {cartQty}
                </span>
              </button>
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={() => handleCart(true, "orders")}
              >
                Orders{" "}
                <span className="badge bg-dark rounded-circle">
                  {cartVarient === "items" ? cartQty : orders.length}
                </span>
              </button>
            {/* <!-- Icon --> */}
            <a href="/" onClick={() => localStorage.setItem("usertoken", "")} className="btn btn-light ms-2">Sign out</a>  
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
};

export default Navbar;