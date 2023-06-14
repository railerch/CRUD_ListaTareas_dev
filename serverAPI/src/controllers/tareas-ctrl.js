const sequelize = require("../sequelize");

const consultarTareas = (req, res) => {
    async function tareas() {
        [rows, metadata] = await sequelize.query('SELECT * FROM tareas')
        res.header("content-type", "application/json");
        res.send(rows);
        res.end();
    }
    tareas();
}

const registrarTarea = (req, res) => {
    let titulo = req.body.titulo;
    let desc = req.body.descripcion;

    async function tareas(titulo, desc) {
        [rows, metadata] = await sequelize.query(`INSERT INTO tareas (id, titulo, descripcion, estatus) VALUES (NULL, '${titulo}', '${desc}', 'pendiente')`)
        res.header("content-type", "application/json");
        res.json({ done: true });
        res.end();
    }

    tareas(titulo, desc);
}

const actualizarTarea = (req, res) => {
    let id = req.params.id;
    let titulo = req.body.titulo ? `titulo = '${req.body.titulo}',` : "titulo = titulo,";
    let desc = req.body.descripcion ? `descripcion = '${req.body.descripcion}'` : "descripcion = descripcion";

    async function tareas(id, titulo, desc) {
        [rows, metadata] = await sequelize.query(`UPDATE tareas SET ${titulo} ${desc} WHERE id = ${id}`)
        res.header("content-type", "application/json");
        res.json({ done: true });
        res.end();
    }

    tareas(id, titulo, desc);
}

const finalizarTarea = (req, res) => {
    let id = req.params.id;

    async function tareas(id) {
        await sequelize.query(`UPDATE tareas SET estatus = 'finalizada' WHERE id = ${id}`)
        res.header("content-type", "application/json");
        res.json({ done: true });
        res.end();
    }

    tareas(id);
}

const eliminarTarea = (req, res) => {
    let id = req.params.id;

    async function tareas(id) {
        await sequelize.query(`DELETE FROM tareas WHERE id = ${id}`)
        res.header("content-type", "application/json");
        res.json({ done: true });
        res.end();
    }

    tareas(id);
}

module.exports = { consultarTareas, registrarTarea, actualizarTarea, finalizarTarea, eliminarTarea };