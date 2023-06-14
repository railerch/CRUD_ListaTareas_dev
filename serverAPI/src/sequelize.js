// Importar modulos
const { Sequelize } = require("sequelize");

// Crear la conexion
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "D:\\02. DESARROLLO WEB\\PRACTICAS\\30 PROYECTOS\\01. ListaTareas\\serverAPI\\src\\db\\lista_tareas.db"
});

// Probar la conexion
async function conn() {
    try {
        await sequelize.authenticate();
        console.log("Conexion establecida.");
    } catch (err) {
        console.log("Error en conexion: " + err);
    }
};
conn();

module.exports = sequelize;

