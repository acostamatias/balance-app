const Mensaje = (props) => {
    console.log(props.errors.type)
    return(
        <>
            {props.errors.type === 'danger' ? 
                <div className="alert alert-danger" role="alert">
                    {props.errors.mensaje}
                </div>
            :
                <div className="alert alert-success" role="alert">
                    {props.errors.mensaje}
                </div>
            }
        </>
    )
}

export default Mensaje