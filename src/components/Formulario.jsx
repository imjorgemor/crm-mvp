import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from './ErrorMessage'
import { useNavigate } from 'react-router-dom'
import Spinner from "./Spinner"

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, "El nombre es muy corto").required("El nombre es obligatorio"),
        empresa: Yup.string().required("El nombre de empresa es obligatorio"),
        email: Yup.string().email("Email no válido").required("El email  es obligatorio"),
        telefono: Yup.number().positive("Número no válido").integer("Número no válido").typeError('El número no es válido'),
        notas: ''
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta;
            if (cliente.id) {
                //editando registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                //nuevo registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json();
            navigate("/clientes")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-grey-600 font-bold text-xl text-center uppercase">{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"} </h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}

                    //formik atributo
                    enableReinitialize={true}

                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();

                    }}

                    validationSchema={nuevoClienteSchema}
                >
                    {/* arrow function para el formulario */}
                    {({ errors, touched }) => {

                        return (
                            <Form
                                className="mt-10"
                            >
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="nombre"
                                    >Nombre</label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="nombre del cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <ErrorMessage>
                                            {errors.nombre}
                                        </ErrorMessage>
                                    ) : null
                                    }
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="empresa"
                                    >Empresa</label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="empresa del cliente"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.nombre ? (
                                        <ErrorMessage>
                                            {errors.empresa}
                                        </ErrorMessage>
                                    ) : null
                                    }
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="email"
                                    >email</label>
                                    <Field
                                        id="email"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="email del cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.nombre ? (
                                        <ErrorMessage>
                                            {errors.email}
                                        </ErrorMessage>
                                    ) : null
                                    }
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="phone"
                                    >Teléfono</label>
                                    <Field
                                        id="phone"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="teléfono del cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.nombre ? (
                                        <ErrorMessage>
                                            {errors.telefono}
                                        </ErrorMessage>
                                    ) : null
                                    }
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="notas"
                                    >Notas</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="notas del cliente"
                                        name="notas"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold" />
                            </Form>
                        )
                    }}
                </Formik>
            </div >
        )
    )
}

Formulario.defaultProps = {
    cliente: {}

}

export default Formulario
