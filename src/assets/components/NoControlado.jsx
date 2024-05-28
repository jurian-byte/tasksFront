import { useRef } from "react";
import { useState } from "react";

const NoControlado = () => {

    const form = useRef(null);
    const [error,setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);

        //capturar los datos del formulario
        const data= new FormData(form.current);
        console.log(...data.entries());

        // convertir el objeto FormData a un objeto
        const {title,description,state} = Object.fromEntries([...data.entries()]);
        console.log(title,description,state);

        //validar los datos
        if(title.trim() === "" || description.trim() === "" || state.trim() === ""){
            console.log("Datos incompletos");

            return setError("Datos incompletos");
        }

    }



    return (
        <form onSubmit={handleSubmit} ref={form}>
            <input type="text" name= "title" placeholder="Ingrese todo" className="form-control mb-2" />

            <textarea name ="description" placeholder="Ingrese descripción" className="form-control mb-2">
            </textarea>

            <select className="form-select mb-2" name="state" defaultValue="">
                <option value="" disabled hidden>Seleccione un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
            </select>

            <button className="btn btn-primary" type="submit">Enviar</button>
            {error && <div className="alert alert-danger">{error}</div>}
        </form>

    );
}

export default NoControlado;