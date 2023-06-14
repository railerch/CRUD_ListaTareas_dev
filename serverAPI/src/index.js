// MODULES
const EXPRESS = require("express");
const APP = EXPRESS();
const SERVER = require("./server.js");
const PATH = require("path");
const URL = require("url");
const CORS = require("./middlewares/cors.js");
const TAREAS = require("./router/tareas-rt.js");
const SESION = require("./router/sesion-rt.js")

// CONFIG
APP.set("port", 8000);

// MIDDLEWARES
APP.use(EXPRESS.urlencoded({ extended: true }))
APP.use(EXPRESS.json({ limit: "1mb" }));
APP.use(CORS);

// ROUTES
APP.get("/", (req, res) => {
    let urlDat = URL.parse(req.url);
    console.log(urlDat);
    res.send("SERVER NODE ACTIVE!").end();
})

APP.use("/tareas", TAREAS);
APP.use("/sesion", SESION);

// SERVER
SERVER(APP, APP.get("port"));