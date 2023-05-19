import { Route } from "react-router-dom";

function PrivateRoute({ path, roles, component: Component,  }) {
  return (
    <>
      <Route path={path} ></Route>
    </>
  );
}

export default PrivateRoute;
