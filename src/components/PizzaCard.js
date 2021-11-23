import React from "react";

const PizzaCard = ({pizzaDetails, addItem}) => {
  return (
    <div className="p-3">
      <div className="card">
        <img
          src={`/images/${pizzaDetails.pos}.jpg`}
          className="card-img-top img-responsive"
          alt="..."
        />
        <div className="card-body pizaa-body d-flex flex-column justify-content-between">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title text-dark">{pizzaDetails.name}</h5>
        </div>
          <p className="card-text">
            {pizzaDetails.veggies.concat(pizzaDetails.meat).join(", ")}
          </p>
          <button onClick={() => addItem(pizzaDetails)} className="btn btn-dark">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;