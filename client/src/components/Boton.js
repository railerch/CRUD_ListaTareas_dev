const Boton = (prop) => {
    return (
        <button className={`btn ${prop.type}`} data-bs-toggle={prop.modalToggle} data-bs-target={prop.modalTarget} onClick={(evt) => prop.renglon ? prop.renglon(prop.task, prop.reg) : ""}><i className={prop.icon}></i> {prop.txt}</button>
    );
}

export default Boton;