import { useState } from "react";
import Aviso from "./Aviso";
const serverAPI = require("../config.json")[0].serverAPI;

const NuevaTareaModal = (prop) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [aviso, setAviso] = useState("");

    const handleAceptar = () => {
        if (titulo !== "" && descripcion !== "") {
            let frm = new FormData();
            frm.append("titulo", titulo);
            frm.append("descripcion", descripcion);

            // URLSearchParams(instancia del FormData).toString() => Importante para que la API procese el contentype correcatamente como 'x-www-form-urlencoded' 
            // y no como 'multipart/formdata' (Sin usar un modulo alternativo)
            let data = new URLSearchParams(frm).toString();

            fetch(`${serverAPI}/tareas/registrar`, { method: "post", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: data, })
                .then(res => res.json())
                .then(res => {
                    if (res.done) {
                        setTitulo("");
                        setDescripcion("");

                        setAviso(<Aviso type="success" title="Exito!" txt="Tarea registrada correctamente." />);

                        prop.recargarTabla();

                        setTimeout(function () {
                            setAviso("");
                        }, 2000)
                    };
                })
                .catch(err => {
                    setAviso(<Aviso type="danger" title="Error!" txt="Ha ocurrido un error al registrar la tarea." />);
                    console.log(`ERROR: ${err}`);
                    setTimeout(function () {
                        setAviso("");
                    }, 2000)
                })
        } else {
            setAviso(<Aviso type="warning" title="Aviso!" txt="Debe completar todos los campos de datos." />);
            setTimeout(function () {
                setAviso("");
            }, 2000)
        }
    }

    const handleCerrar = () => {
        setTitulo("");
        setDescripcion("");
    }

    return (
        <div className="modal fade" id="nueva-tarea-modal" tabIndex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document" style={{ maxWidth: "50%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId"><i className="bi bi-card-checklist"></i> Nueva tarea</h5>
                    </div>
                    <div className="modal-body">
                        <div>{aviso}</div>
                        <form id="tarea-frm">
                            <div className="input-group">
                                <span className="input-group-text">Titulo</span>
                                <input className="form-control" type="text" name="titulo" id="titulo" onChange={(evt) => setTitulo(evt.target.value)} value={titulo} />
                            </div>
                            <div className="form-group mt-2">
                                <textarea className="form-control" name="descripcion" id="descripcion" placeholder="Descripción de la tarea..." style={{ resize: "none" }} onChange={(evt) => setDescripcion(evt.target.value)} value={descripcion}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCerrar()}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleAceptar()} >Aceptar</button>
                    </div>
                </div>
            </div >
        </div >
    );
}

const EliminarTareaModal = (prop) => {
    return (
        <div className="modal fade" id="eliminar-tarea-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document" style={{ maxWidth: "30%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId"><i className="bi bi-trash"></i> Eliminar tarea</h5>
                    </div>
                    <div className="modal-body">
                        <p>Desea eliminar la tarea seleccionada?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(evt) => prop.confirmar()}>Si</button>
                    </div>
                </div>
            </div >
        </div >
    );
}

const FinalizarTareaModal = (prop) => {
    return (
        <div className="modal fade" id="finalizar-tarea-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document" style={{ maxWidth: "30%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId"><i className="bi bi-check-square"></i> Finalizar tarea</h5>
                    </div>
                    <div className="modal-body">
                        <p>Desea completar la tarea seleccionada?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(evt) => prop.confirmar()}>Si</button>
                    </div>
                </div>
            </div >
        </div >
    );
}

export { NuevaTareaModal, FinalizarTareaModal, EliminarTareaModal };