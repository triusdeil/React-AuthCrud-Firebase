import React, { useEffect, useState } from "react";
import { firebase } from "../../../database/firebase";

export default function ListUsers() {
  const [tareas, setTareas] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    const obtenerDatos = async () => {
      try {
        const data = await db.collection("tareas").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);
  return (
    <div>
      <h1 className="h1">List</h1>
      <ul className="list-group mt-2">
        {tareas.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.tarea}
          </li>
        ))}
      </ul>
    </div>
  );
}
