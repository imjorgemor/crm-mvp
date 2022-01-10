import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'


const EditarCliente = () => {

    const { id } = useParams();

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true)

    const { nombre, empresa, notas, email, telefono } = cliente;

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(() => {
            setCargando(false)
            
        }, 500);
       
        obtenerClienteAPI();
    }, [])

    return (
        <div>
            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
            <p className="mt-3">Uitilizar este formulario para editar datos</p>

            <Formulario
                cliente={cliente}
                cargando={cargando}
            />

        </div>
    )
}

export default EditarCliente
