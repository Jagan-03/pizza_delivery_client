import React from "react";

const AdminNav = () => {
  return (
    <div className="adminNav p-3 sticky-top">
      {/* // <!-- Navbar --> */}
      <nav className="navbar">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          <h3 className="text-light">
            <i className="fas fa-pizza-slice text-danger"></i> Pizza house
          </h3>
          {/* <!-- Right elements --> */}
          <div className="d-flex align-items-center">
            {/* <!-- Icon --> */}
            <a
              href="/"
              onClick={() => localStorage.setItem("admintoken", "")}
              className="btn btn-light ms-2"
            >
              Sign out
            </a>
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
};

export default AdminNav;
