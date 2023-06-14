const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const SESION = require("../controllers/sesion-ctrl");

ROUTER.post("/login", SESION.iniciarSesion);
ROUTER.get("/logout", SESION.cerrarSesion);

module.exports = ROUTER;