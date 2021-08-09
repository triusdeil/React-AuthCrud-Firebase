import React, { useCallback, useState } from "react";
import { auth, db } from "../database/firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(false);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      //console.log("ingrese un email");
      setError("Ingrese un Email");
      return;
    }
    if (!pass.trim()) {
      //console.log("ingrese un password");
      setError("Ingrese un Password");
      return;
    }
    if (pass.length < 6) {
      //console.log("su contraseña debe ser mayor a 6 caracteres");
      setError("su contraseña debe ser mayor a 6 caracteres");
      return;
    }
    setError(null);
    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no corresponde");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass, props.history]);

  const registrar = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        id: res.user.uid,
      });
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
      console.log(res.user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya utilizado");
      }
    }
  }, [email, pass, props.history]);
  return (
    <div>
      <h3 className="text-center">
        {esRegistro ? "Registro de usuario" : "Login de Usuario"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <div className="d-grid gap-2 mb-2">
              <button className="btn btn-dark btn-lg" type="submit">
                {esRegistro ? "Registrarse" : "Acceder"}
              </button>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-info btn-sm"
                onClick={() => setEsRegistro(!esRegistro)}
                type="button"
              >
                {esRegistro
                  ? "Ya tienes cuenta de usuario?"
                  : "No tienes Cuenta?"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
