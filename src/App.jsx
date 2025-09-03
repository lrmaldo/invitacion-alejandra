import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Invitacion from './Invitacion'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 flex items-center justify-center p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invitacion/:nombre" element={<Invitacion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <div className="max-w-2xl w-full mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-800">Invitación de XV años</h1>
      <p className="text-gray-600 mb-6">Usa la ruta <code className="bg-white px-2 py-1 rounded">#/invitacion/Fulana</code> para ver la invitación personalizada.</p>
      <Link to="/invitacion/Fulana" className="inline-block bg-gradient-to-r from-purple-400 to-indigo-400 text-white px-6 py-3 rounded-lg shadow-md">Ver ejemplo</Link>
    </div>
  )
}

function NotFound() {
  return (
    <div className="text-center text-gray-600">
      <h2 className="text-2xl font-semibold">Página no encontrada</h2>
      <p className="mt-2">Revisa la ruta o vuelve al inicio.</p>
    </div>
  )
}
