import React from "react";

const OrderDetails = ({ orders, updateOrderStatus, customers }) => {
  const [pendingOrder, setPendingOrders] = React.useState([]);
  const [inKitchen, setInKitchen] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);

  React.useEffect(() => {
    let pending = orders.filter((order) => order.status === "Order pending");
    setPendingOrders(pending);
    let kitchen = orders.filter((order) => order.status === "In the kitchen");
    setInKitchen(kitchen);
    let comp = orders.filter((order) => order.status === "Sent for delivery");
    setCompleted(comp);
  }, [orders]);

  return (
    <div className="admin-stats d-flex flex-column col-md-6 order-dettails p-3">
      <div className="bg-light rounded orders h-100">
        <ul
          className="nav nav-tabs rounded-top nav-justified bg-primary"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="ex3-tab-1"
              data-mdb-toggle="tab"
              href="#ex3-tabs-1"
              role="tab"
              aria-controls="ex3-tabs-1"
              aria-selected="true"
            >
              PENDING ORDERS
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="ex3-tab-2"
              data-mdb-toggle="tab"
              href="#ex3-tabs-2"
              role="tab"
              aria-controls="ex3-tabs-2"
              aria-selected="false"
            >
              IN THE KITCHEN
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="ex3-tab-3"
              data-mdb-toggle="tab"
              href="#ex3-tabs-3"
              role="tab"
              aria-controls="ex3-tabs-3"
              aria-selected="false"
            >
              SENT TO DELIVERY
            </a>
          </li>
        </ul>

        <div className="tab-content bg-light" id="ex2-content">
          <div
            className={`tab-pane fade show active ${
              pendingOrder.length === 0 ? "text-center" : ""
            }`}
            id="ex3-tabs-1"
            role="tabpanel"
            aria-labelledby="ex3-tab-1"
          >
            {pendingOrder.length > 0 ? (
              pendingOrder.map((order, index) => {
                return (
                  <div
                    key={index}
                    className="order d-flex w-100 border-bottom justify-content-between align-items-center mb-3 p-2"
                  >
                    <span className="m-0 p-0">
                      <span className="fw-bold">
                        {customers[order.user_id]}
                      </span>{" "}
                      <br />{" "}
                      <span className="fw-bold badge bg-info text-dark">
                        Customer ID : {order.user_id}
                      </span>{" "}
                      <br /> <span className="">{order.name}</span> <br />{" "}
                      <button
                        className="btn btn-sm btn-outline-dark m-2"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target={`#collapseExample${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseExample${index}`}
                      >
                        Items <i className="fas fa-caret-down"></i>
                      </button>
                      <div className={`collapse mt-3`} id={`collapseExample${index}`}>
                        {order.items.map((item, index) => {
                          return (
                            <li key={index} className="">
                              {item.name} : {item.quantity}
                            </li>
                          );
                        })}
                      </div>
                      <br />{" "}
                      <span>
                        Order status :{" "}
                        <span className="text-danger">{order.status}</span>
                      </span>
                    </span>
                    <div>
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          updateOrderStatus(order, "In the kitchen")
                        }
                      >
                        Send to kitchen
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="p-5">No pending orders</h3>
            )}
          </div>
          <div
            className={`tab-pane fade ${
              inKitchen.length === 0 ? "text-center" : ""
            }`}
            id="ex3-tabs-2"
            role="tabpanel"
            aria-labelledby="ex3-tab-2"
          >
            {inKitchen.length > 0 ? (
              inKitchen.map((order, index) => {
                return (
                  <div
                    key={index}
                    className="order d-flex w-100 border-bottom justify-content-between align-items-center mb-3 p-2"
                  >
                    <span className="m-0 p-0">
                      <span className="fw-bold">
                        {customers[order.user_id]}
                      </span>{" "}
                      <br />{" "}
                      <span className="fw-bold badge bg-info text-dark">
                        Customer ID : {order.user_id}
                      </span>{" "}
                      <br /> <span className="">{order.name}</span> <br />{" "}
                      <button
                        className="btn btn-sm btn-outline-dark m-2"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target={`#collapseExample${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseExample${index}`}
                      >
                        Items <i className="fas fa-caret-down"></i>
                      </button>
                      <div className={`collapse mt-3`} id={`collapseExample${index}`}>
                        {order.items.map((item, index) => {
                          return (
                            <li key={index} className="">
                              {item.name} : {item.quantity}
                            </li>
                          );
                        })}
                      </div>
                      <br />{" "}
                      <span>
                        Order status :{" "}
                        <span className="text-warning">{order.status}</span>
                      </span>
                    </span>
                    <div>
                      <button
                        className="btn btn-warning text-dark"
                        onClick={() =>
                          updateOrderStatus(order, "Sent for delivery")
                        }
                      >
                        Send for delivery
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="p-5">No items in kitchen...</h3>
            )}
          </div>
          <div
            className={`tab-pane fade ${
              completed.length === 0 ? "text-center" : ""
            }`}
            id="ex3-tabs-3"
            role="tabpanel"
            aria-labelledby="ex3-tab-3"
          >
            {completed.length > 0 ? (
              completed.map((order, index) => {
                return (
                  <div
                    key={index}
                    className="order d-flex w-100 border-bottom justify-content-between align-items-center mb-3 p-2"
                  >
                    <span className="m-0 p-0">
                      <span className="fw-bold">
                        {customers[order.user_id]}
                      </span>{" "}
                      <br />{" "}
                      <span className="fw-bold badge bg-info text-dark">
                        Customer ID : {order.user_id}
                      </span>{" "}
                      <br /> <span className="">{order.name}</span> <br />{" "}
                      <button
                        className="btn btn-sm btn-outline-dark m-2"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target={`#collapseExample${index}`}
                        aria-expanded="false"
                        aria-controls={`collapseExample${index}`}
                      >
                        Items <i className="fas fa-caret-down"></i>
                      </button>
                      <div className={`collapse mt-3`} id={`collapseExample${index}`}>
                        {order.items.map((item, index) => {
                          return (
                            <li key={index} className="">
                              {item.name} : {item.quantity}
                            </li>
                          );
                        })}
                      </div>
                      <br />
                      <span>
                        Order status :{" "}
                        <span className="text-success">{order.status}</span>
                      </span>
                    </span>
                    <div>
                      <span className="badge bg-success p-2">
                        Order Completed
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="p-5">No items pending for delivery...</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
