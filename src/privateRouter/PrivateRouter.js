import { Redirect, Route } from "react-router";

import React from "react";

function PrivateRouter(props) {
  const firstLogin = localStorage.getItem("first_login");
  return firstLogin ? <Route {...props} /> : <Redirect to="/" />;
}

export default PrivateRouter;
