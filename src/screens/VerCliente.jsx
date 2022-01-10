import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {

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
            {cargando ? <Spinner /> : (
                <div>
                    <h1 className="font-black text-4xl text-blue-900">Ver cliente: {nombre}</h1>
                    <p className="mt-3">Información del Cliente</p>

                    <p className="text-gray-600 text-2xl mt-10">
                        <span className='text-gray-800 font-bold uppercase'> Cliente: </span>{nombre}
                    </p>
                    <p className="text-gray-600 text-2xl mt-4">
                        <span className='text-gray-800 font-bold uppercase'> Email: </span>{email}
                    </p>
                    <p className="text-gray-600 text-2xl mt-4">
                        <span className='text-gray-800 font-bold uppercase'> Teléfono: </span>{telefono}
                    </p>
                    <p className="text-gray-600 text-2xl mt-4">
                        <span className='text-gray-800 font-bold uppercase'> Empresa: </span>{empresa}
                    </p>
                    {notas &&
                        <p className="text-gray-600 text-2xl mt-4">
                            <span className='text-gray-800 font-bold uppercase'> Notas: </span>{notas}
                        </p>
                    }
                </div>
            )}
        </div>
    )
}

export default VerCliente
