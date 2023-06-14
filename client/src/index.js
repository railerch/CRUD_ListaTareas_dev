
import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Tareas from "./pages/Tareas";

const server = ReactDOM.createRoot(document.getElementById("root"));
server.render(
  <>
    <Tareas key="Tareas" />
  </>
);