const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const TAREAS = require("../controllers/tareas-ctrl");

ROUTER.get("/registradas", TAREAS.consultarTareas);
ROUTER.post("/registrar", TAREAS.registrarTarea);
ROUTER.post("/actualizar/:id", TAREAS.actualizarTarea);
ROUTER.get("/finalizar/:id", TAREAS.finalizarTarea);
ROUTER.get("/eliminar/:id", TAREAS.eliminarTarea);

module.exports = ROUTER;
