import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import Inicio from './screens/Inicio'
import LoginForm from './screens/LoginForm'
import NuevoCliente from './screens/NuevoCliente'
import EditarCliente from './screens/EditarCliente'
import VerCliente from './screens/VerCliente'

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/clientes" element={<Layout />}>
                    <Route index element={<Inicio />}/>
                    <Route path="nuevo" element={<NuevoCliente />}/>
                    <Route path="editar/:id" element={<EditarCliente />}/>
                    <Route path=":id" element={<VerCliente />}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
