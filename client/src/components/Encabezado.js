import Boton from "./Boton";

const Encabezado = (prop) => {
    const btnConfig = {
        type: "btn-outline-success",
        icon: "bi bi-plus",
        txt: "Nueva tarea",
        modalToggle: "modal",
        modalTarget: "#nueva-tarea-modal",
        renglon: ""
    }

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between">
                <h1 className="m-0"><i className="bi bi-card-checklist"></i> {prop.txt}</h1>
                <Boton key="nueva-tarea" {...btnConfig} />
            </div>
            <hr />
        </div>
    );
}

export default Encabezado;