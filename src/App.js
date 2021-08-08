import "./App.css";
import React, { useEffect, useState } from "react";
import { firebase } from "./database/firebase";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  useEffect(() => {
    const obtenerDatos = async () => {
      const db = firebase.firestore();
      try {
        const data = await db.collection("tareas").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("esta vacio");
      return;
    }
    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        tarea: tarea,
      };
      const data = db.collection("tareas").add({
        tarea: tarea,
      });
      setTareas([...tareas, { id: data.id, ...nuevaTarea }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-md-6">
          <h3>Lista de Tareas</h3>
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span>{item.tarea}</span>
                <button className="btn btn-warning float-end mx-2">
                  Editar
                </button>
                <button className="btn btn-danger float-end">Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Formulario</h3>
          <form onSubmit={agregarTarea}>
            <input
              type="text"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
              className="form-control"
            />
            <div className="d-grid gap-2">
              <button className="btn btn-dark mt-3">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
