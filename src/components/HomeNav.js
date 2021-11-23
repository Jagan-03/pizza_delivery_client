import React from "react";


const Navbar = () => {
  return (
    <div className="homeNav p-3">
      {/* // <!-- Navbar --> */}
      <nav className="navbar">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
            <h3 className="text-light"><i className="fas fa-pizza-slice text-danger"></i> Pizza house</h3>
          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            {/* <!-- Icon --> */}
            <a href="/login" className="btn btn-light ms-2">Login</a>  
            <a href="/register" className="btn btn-dark ms-2">Register</a>
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