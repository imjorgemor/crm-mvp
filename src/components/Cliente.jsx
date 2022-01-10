import {useNavigate} from 'react-router-dom'

const Cliente = ({ cliente, handleDelete }) => {

    const navigate = useNavigate();

    const { nombre, empresa, email, telefono, notas, id } = cliente;

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-5">{nombre}</td>
            <td className="p-5">
                <p><span className="text-grey-800 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-grey-800 uppercase font-bold">Phone: </span>{telefono}</p>


            </td>
            <td className="p-5">{empresa}</td>
            <td className="p-5">
            <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs"
                    onClick={()=> navigate(`/clientes/${id}`)}

                >Ver</button>
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
                    onClick={()=> navigate(`/clientes/editar/${id}`)}

                >Editar</button>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
                    onClick={()=> handleDelete(id)}
                    
                    >Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente
