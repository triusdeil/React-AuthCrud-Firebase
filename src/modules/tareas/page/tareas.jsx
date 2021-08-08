import React from "react";
import Form from "../forms/form";
import ListUsers from "../list/ListUsers";
export default function tareas() {
  return (
    <div className="container">
      <h1 className=""> Firebase Crud</h1>
      <div className="row">
        <div className="col-md-6">
          <ListUsers />
        </div>
        <div className="col-md-6">
          <Form />
        </div>
      </div>
    </div>
  );
}
