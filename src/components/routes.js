import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserHome from "../pages/UserHome";
import AdminHome from "../pages/AdminHome";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route path="/admin/:id" component={AdminHome} />
            <Route path="/home/:id" component={UserHome} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
        </>
    )
}

export default Routes;