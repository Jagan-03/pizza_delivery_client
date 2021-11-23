import React from "react";

const Inventory = ({inventory}) => {

  return (
    <div className="admin-stats col-md-6 p-3">
        <div className="inventory-head bg-primary p-2 rounded-top text-center">
          <h3 className="text-light">INVENTORY</h3>
          <p className="text-white-50">(Updates in the inventory will take some time)</p>
        </div>
      <div className="inventory d-flex flex-column w-100 rounded-bottom bg-light">
        {inventory.length === 0 ? 
          <div className="card-body d-flex flex-column align-items-center justify-content-center bg-light w-100">
            <div id="spinner" className="mb-3"></div>
            <p>fetching data....</p>
          </div>
         : <div className="card-body bg-light w-100">
                  {inventory.map((ite, index) => {
                    return (
                      <div key={index} className="mb-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6>{ite.name}</h6>
                            <p className="p-0 m-0">{ite.quantity} Nos</p>
                          </div>  
                          <div className="progress">
                                <div
                                    className={`progress-bar progress-bar-striped progress-bar-animated ${ite.quantity <= 20 ? "bg-danger" : ite.quantity <= 25 ? "bg-secondary" : ite.quantity <= 50 ? "bg-success" : ""}`}
                                    role="progressbar"
                                    aria-valuenow="75"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{width: `${ite.quantity * 2}%`}}
                                ></div>
                            </div>
                      </div>
                    );
                  })}
                </div>}
                
      </div>
    </div>
  );
};

export default Inventory;
