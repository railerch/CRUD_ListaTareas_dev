const URL = require("url");
const config = require("../config.json");

const iniciarSesion = (req, res) => {
    let pass = req.body.pass;

    if (pass === "") {
        res.status(400);
        res.header("content-type", "application/json");
        res.send(JSON.stringify({ stmt: false, code: 400 }));
        res.send().end();
    } else if (pass === config[0].loginPass) {
        res.status(200);
        res.header("content-type", "application/json");
        res.send(JSON.stringify({ stmt: true, code: 200 }));
        res.send().end();
    } else {
        res.status(401);
        res.header("content-type", "application/json");
        res.send(JSON.stringify({ stmt: false, code: 401 }));
        res.send().end();
    }
}

const cerrarSesion = (req, res) => {
    res.status(200);
    res.header("content-type", "application/json");
    res.send(JSON.stringify({ stmt: true, code: 401 }));
    res.send().end();
}

module.exports = { iniciarSesion, cerrarSesion };