const Aviso = (prop) => {
    return (
        <div className="container mt-2">
            <div className={`alert alert-${prop.type}`} role="alert">
                <strong>{prop.title}</strong> {prop.txt}
            </div>
        </div>
    );
}

export default Aviso;