// WEB SERVER
function server(app, port) {
    app.listen(port, () => {
        console.log(`Server at: http://localhost: ${port}`);
    })
}

module.exports = server;
