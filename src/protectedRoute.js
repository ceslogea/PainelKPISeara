import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
  component: Component,
  isAuthenticated: isAuthenticated,
//   logout: logout,
  ...rest
}) {
    console.log(isAuthenticated)
  return (
    <Route {...rest} render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />);
        }
      }}
    />
  );
}

export default ProtectedRoute;