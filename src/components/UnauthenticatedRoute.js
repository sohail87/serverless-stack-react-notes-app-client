import React from "react";
import { Route, Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  console.log(name);
  name = name.replace(/[[]]/g, "\\$&");
  console.log(name);
  
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");

  console.log(url);
  const results = regex.exec(url);
  console.log(results);
  

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
 // results[2] = the url querystring value 
 // e.g. if query string name is "?redirect=" 
 //      then value= "/notes/b1abe800-fe0e-11e7-8ea4-db065580bb18"
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !cProps.isAuthenticated
          ? <C {...props} {...cProps} />
          : <Redirect
              to={redirect === "" || redirect === null ? "/" : redirect}
            />}
    />
  );
};