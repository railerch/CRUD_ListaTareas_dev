import { useState, useEffect } from "react";
import Aviso from "../components/Aviso";
import Encabezado from "../components/Encabezado";
import { NuevaTareaModal, EliminarTareaModal, FinalizarTareaModal } from "../components/Modal";
import Boton from "../components/Boton";

const serverAPI = require("../config.json")[0].serverAPI;

const Tareas = (prop) => {

    console.log("Componente actualizado...");
    const [tareas, setTareas] = useState(undefined);
    const [renglon, setRenglon] = useState(undefined);
    const [accion, setAccion] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    const [aviso, setAviso] = useState(undefined);

    useEffect(() => {
        fetch(`${serverAPI}/tareas/registradas`)
            .then(res => res.json())
            .then(res => {
                setTareas(res);
                setRefresh(false);
            })
    }, [refresh]);

    const actualizarBtn = {
        task: "actualizar",
        type: "btn-outline-warning",
        icon: "bi-arrow-repeat",
        txt: "",
        modalToggle: "",
        modalTarget: "",
        renglon: (...reg) => {
            let accion = reg[0];
            let id = reg[1];

            // Aplicar cambios
            let registro = document.querySelector(`.table tbody tr[id=reg-${id}]`);

            let frm = new FormData();
            frm.append("titulo", registro.querySelector("td:nth-child(2)").innerText);
            frm.append("descripcion", registro.querySelector("td:nth-child(3)").innerText);
            let data = new URLSearchParams(frm).toString();

            fetch(`${serverAPI}/tareas/${accion}/${id}`, { method: "post", body: data, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } })
                .then(res => res.json())
                .then(res => {

                    setAviso({
                        type: "success",
                        title: "Exito!",
                        txt: "Tarea actualizada."
                    });

                    setTimeout(() => {
                        setAviso(undefined);
                    }, 2000)

                    setRefresh(true);
                })
        }
    }

    const finalizarBtn = {
        task: "finalizar",
        type: "btn-outline-success",
        icon: "bi bi-check",
        txt: "",
        modalToggle: "modal",
        modalTarget: "#finalizar-tarea-modal",
        renglon: (...reg) => {
            setAccion(reg[0]);
            setRenglon(reg[1]);
        }
    }

    const eliminarBtn = {
        task: "eliminar",
        type: "btn-outline-danger",
        icon: "bi bi-trash",
        txt: "",
        modalToggle: "modal",
        modalTarget: "#eliminar-tarea-modal",
        renglon: (...reg) => {
            setAccion(reg[0]);
            setRenglon(reg[1]);
        }
    }

    const recargarTabla = () => {
        setRefresh(true);
    }

    const confirmar = () => {
        fetch(`${serverAPI}/tareas/${accion}/${renglon}`)
            .then(res => res.json())
            .then(res => {
                let txt = undefined;
                switch (accion) {
                    case "finalizar":
                        txt = "Tarea finalizada."
                        break;
                    case "eliminar":
                        txt = "Tarea eliminada."
                        break;
                    default:
                        break;
                }

                setAviso({
                    type: "success",
                    title: "Exito!",
                    txt: txt
                });

                setTimeout(() => {
                    setAviso(undefined);
                }, 2000)

                setRefresh(true);
            })
    }

    let style = {
        minHeight: "350px",
        maxHeight: "350px",
        padding: "5px",
        border: "1px solid lightgray",
        borderRadius: "5px",
        overflowY: "auto"
    }

    if (tareas) {
        return (
            <>
                <Encabezado txt="Lista de tareas" />

                <div className="container" style={style}>
                    <div className="table-responsive">
                        <table className="table table-striped align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th style={{ width: "50px" }}>#</th>
                                    <th>Titulo</th>
                                    <th>Descripción</th>
                                    <th className="text-center">Acc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tareas.map(t => {
                                        return (
                                            <tr id={`reg-${t.id}`} key={`reg-${t.id}`} >
                                                <td>{t.id}</td>
                                                <td className="w-25" contentEditable={t.estatus === "pendiente" ? true : false} >{t.titulo}</td>
                                                <td className="w-75" contentEditable={t.estatus === "pendiente" ? true : false}>{t.descripcion}</td>
                                                <td className="text-center d-flex justify-content-center d-grid gap-1">
                                                    {t.estatus === "finalizada" ? "" : <Boton key="actualizar-tarea" reg={t.id} {...actualizarBtn} />}
                                                    {t.estatus === "finalizada" ? "" : <Boton key="finalizar-tarea" reg={t.id} {...finalizarBtn} />}
                                                    <Boton key="eliminar-tarea" reg={t.id} {...eliminarBtn} />
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div >

                <p className="text-center mt-2 mb-1">Proyecto realizado 100% con JavaScript - Node, React, Sequelize, Bootstrap -</p>
                <p className="text-center"><b>Railer Chalbaud - Full Stack Developer</b></p>

                {aviso ? <Aviso {...aviso} /> : ""}

                <NuevaTareaModal recargarTabla={() => recargarTabla()} />
                <FinalizarTareaModal confirmar={() => confirmar()} />
                <EliminarTareaModal confirmar={() => confirmar()} />
            </>
        );
    }
}

export default Tareas;