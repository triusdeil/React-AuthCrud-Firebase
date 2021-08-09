import React, { useEffect, useState } from "react";
import { auth } from "../database/firebase";
import { withRouter } from "react-router-dom";
const Admin = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (auth.currentUser) {
      console.log("existen un usuario");
      setUser(auth.currentUser);
    } else {
      console.log("no existe un usuario");
      props.history.push("/login");
    }
  }, [props.history]);
  return (
    <div>
      <h1>Ruta Protegida</h1>
      {user && <h3>{user.email}</h3>}
    </div>
  );
};

export default withRouter(Admin);
