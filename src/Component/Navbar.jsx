import React from "react";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../database/firebase";
import { withRouter } from "react-router-dom";
const Navbar = (props) => {
  const CerrarSesion = () => {
    auth.signOut().then(() => {
      props.history.push("/login");
    });
  };
  return (
    <div>
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand ml-2" to="/">
          AUTH
        </Link>
        <div className="">
          <div className="d-flex">
            <NavLink className="btn btn-dark mr-2" to="/" exact>
              Inicio
            </NavLink>
            {props.firebaseUser !== null ? (
              <NavLink className="btn btn-dark mr-2" to="/admin" exact>
                Administracion
              </NavLink>
            ) : null}

            {props.firebaseUser !== null ? (
              <button className="btn btn-dark" onClick={() => CerrarSesion()}>
                Cerrar Sesion
              </button>
            ) : (
              <NavLink className="btn btn-dark mr-2" to="/login" exact>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Navbar);
