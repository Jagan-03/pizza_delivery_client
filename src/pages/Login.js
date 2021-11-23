import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { loginUser } from "../controllers/login";
import  { resetPassword } from "../controllers/resetPassword"; 

const Login = () => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    password.setValues({
      email: "",
      password: "",
      repeatPassword: "",
    });
  } 

  const user = useFormik({
    initialValues: {
      email: "",
      password: "",
      admin: "",
    },
    async onSubmit(values) {
      try {
        const response = await loginUser(values);
        if (user.values.admin) {
          const { token, admin_id } = response.data;
          await localStorage.setItem("adminToken", token);
          history.push(`/admin/${admin_id}`);
        } else {
          const { token, user_id } = response.data;
          await localStorage.setItem("userToken", token);
          history.push(`/home/${user_id}`);
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
  });

  const password = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    async onSubmit(values) {
      try {
          if(values.password === values.repeatPassword){
            delete values.repeatPassword;
            const response = await resetPassword(values);
            if(response) alert("Password updated successfully. Please login to continue.");
            handleClose();
          } else {
            alert("Passwords doesn't match...");
            password.setValues({
              ...values,
              password: "",
              repeatPassword: "",
            })
          }
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  return (
    <div className="login">
      <section>
        <div className="container p-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/images/login_logo.jpg"
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={user.handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3"></i>
                          <span className="h1 fw-bold mb-0">Pizza house</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account if you're already registered.
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="email"
                            value={user.values.email}
                            onChange={user.handleChange}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            value={user.values.password}
                            onChange={user.handleChange}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="admin"
                            onChange={user.handleChange}
                            value={user.values.admin}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Login as admin
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div className="w-100 text-end mb-3">
                              <i
                                className="fas fa-times fa-2x"
                                onClick={handleClose}
                              ></i>
                            </div>
                            <form onSubmit={password.handleSubmit}>

                              <div className="form-outline-dark mb-4">
                                <input
                                  type="email"
                                  id="form1Example1"
                                  className="form-control"
                                  name="email"
                                  onChange={password.handleChange}
                                  value={password.values.email}
                                  placeholder="Email address"
                                />
                              </div>

                              <div className="form-outline-dark mb-4">
                                <input
                                  type="password"
                                  id="form1Example2"
                                  className="form-control"
                                  name="password"
                                  onChange={password.handleChange}
                                  value={password.values.password}
                                  placeholder="New password"
                                />
                              </div>

                              <div className="form-outline-dark mb-3">
                                <input
                                  type="password"
                                  id="form1Example2"
                                  className="form-control"
                                  name="repeatPassword"
                                  onChange={password.handleChange}
                                  value={password.values.repeatPassword}
                                  placeholder="Repeat password"
                                />
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                              >
                                Update
                              </button>
                            </form>
                          </Box>
                        </Modal>
                        <a
                          className="small text-muted"
                          href="#!"
                          onClick={handleOpen}
                        >
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2">
                          Don't have an account?{" "}
                          <a href="/register">Register here</a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
