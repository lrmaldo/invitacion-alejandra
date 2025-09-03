import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Invitacion() {
  const { nombre } = useParams()
  const [invitado, setInvitado] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
    fetch(`${base}invitados.json`)
      .then((r) => r.json())
      .then((data) => {
        const target = decodeURIComponent(nombre || '').toLowerCase()
        const found = data.find((i) => (i.nombre || '').toLowerCase() === target)
        setInvitado(found || null)
      })
      .catch(() => setInvitado(null))
      .finally(() => setLoading(false))
  }, [nombre])

  if (loading) return <div className="animate-fade-in text-center p-8"><p className="text-gray-500">Cargando invitación...</p></div>

  if (!invitado) {
    return (
      <div className="max-w-3xl w-full mx-auto p-8 bg-white/80 backdrop-blur rounded-2xl shadow-lg text-center animate-fade-in-up">
        <h2 className="text-2xl font-semibold text-gray-800">Invitado no encontrado</h2>
        <p className="mt-2 text-gray-600">No hay registro para <strong>{decodeURIComponent(nombre)}</strong>.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 underline">Volver al inicio</Link>
      </div>
    )
  }

  const baseUrl = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'

  // Decide content based on invitado.evento
  const evento = (invitado && invitado.evento) ? invitado.evento : null

  const renderContent = () => {
    if (!invitado) {
      return (
        <>
          <p className="mt-4 text-gray-600">Invitamos a todos a acompañarnos en la celebración de los XV años de Alejandra Gómez Morales.</p>
          <div className="mt-6 text-gray-700">
            <p><strong>Fecha:</strong> 11 de Octubre de 2025</p>
            <p><strong>Lugar:</strong> <span className="venue">Cra 4 #12-74, La Candelaria, Bogotá</span></p>
          </div>
        </>
      )
    }

    if (evento === 'cena') {
      return (
        <>
          <p className="mt-4 text-gray-700">Con la bendición de Dios y el amor de su familia, invitamos a que nos acompañes a la cena de celebración de los XV años de Alejandra Gómez Morales.</p>
          <div className="mt-6 text-gray-700">
            <p>📅 <strong>11 de Octubre de 2025</strong></p>
            <p>📍 <span className="venue">Cra 4 #12-74, La Candelaria, Bogotá</span></p>
          </div>
        </>
      )
    }

    if (evento === 'fiesta') {
      return (
        <>
          <p className="mt-4 text-gray-700 font-semibold">¡Alejandra cumple XV! 🎉</p>
          <p className="text-gray-600">Fiesta con sus amigos del colegio llena de música, baile y diversión.</p>
          <div className="mt-6 text-gray-700">
            <p>📅 <strong>4 de Octubre de 2025</strong></p>
            <p>📍 <span className="venue">Carrera 37 # 33 - 43, Conjunto residencial Laurel</span></p>
            <p className="mt-1">🕗 <strong>a las 8 de la noche</strong></p>
          </div>
        </>
      )
    }

    // fallback
    return (
      <>
        <p className="mt-4 text-gray-600">Te esperamos para celebrar los XV años con música, baile y mucha alegría.</p>
        <div className="mt-6 text-gray-700">
          <p><strong>Fecha:</strong> 11 de Octubre de 2025</p>
          <p><strong>Lugar:</strong> <span className="venue">Cra 4 #12-74, La Candelaria, Bogotá</span></p>
        </div>
      </>
    )
  }

  return (
    <div className="invitation-hero">
      <div className="invitation-card animate-fade-in-up" style={{ animationFillMode: 'forwards', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div className="relative overflow-hidden rounded-2xl shadow-lg card-accent" style={{ minHeight: 360, backgroundImage: `url(${baseUrl}fondo.svg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50 backdrop-blur-sm" />
  <Fireworks interval={8000} />
        <div className="ribbon">Alejandra Gómez Morales</div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-8 items-center">
          <div className="col-span-1 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-white/80 flex items-center justify-center text-4xl font-serif text-indigo-700 shadow-md">XV</div>
          </div>
          <div className="col-span-2 p-2">
            <h2 className="text-3xl md:text-4xl host-name">Estás invitado</h2>
            <p className="mt-2 text-lg text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>a la celebración de <strong className="host-name">Alejandra Gómez Morales</strong></p>
            <svg className="flourish-svg" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M10 20 C40 0, 60 0, 90 20 S140 40, 180 20" stroke="#d97706" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {renderContent()}
            <RSVP nombre={invitado.nombre} />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

function RSVP({ nombre }) {
  const key = `rsvp_${nombre}`
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setStatus(JSON.parse(raw).status)
    } catch (e) {
      // ignore
    }
  }, [key])

  const save = (s) => {
    setSaving(true)
    const payload = { nombre, status: s, ts: Date.now() }
    try {
      localStorage.setItem(key, JSON.stringify(payload))
      setStatus(s)
    } catch (e) {
      console.error('No se pudo guardar RSVP', e)
    } finally {
      setTimeout(() => setSaving(false), 300)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4">
        <button disabled={saving} onClick={() => save('Asistiré')} className={`px-4 py-2 rounded-lg text-white btn-gold ${status === 'Asistiré' ? 'shadow-confirm' : ''} transition`}>Asistiré</button>
        <button disabled={saving} onClick={() => save('Quizá')} className={`px-4 py-2 rounded-lg text-white btn-rose ${status === 'Quizá' ? 'shadow-confirm' : ''} transition`}>Quizá</button>
        <button disabled={saving} onClick={() => save('No podré')} className={`px-4 py-2 rounded-lg text-white ${status === 'No podré' ? 'bg-red-500 shadow-confirm' : 'bg-gray-400'} transition`}>No podré</button>
      </div>

      {status ? (
        <p className="mt-3 text-sm text-gray-600">Estado: <strong className="text-gray-800">{status}</strong></p>
      ) : (
        <p className="mt-3 text-sm text-gray-600">Selecciona tu respuesta para guardar tu RSVP en este dispositivo.</p>
      )}
    </div>
  )
}

// Simple fireworks/confetti effect component
function Fireworks({ interval = 8000 }) {
  const [bursts, setBursts] = useState([])
  useEffect(() => {
    let timer
    const isSmall = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches
    const effectiveInterval = isSmall ? Math.max(12000, interval) : interval
    timer = setInterval(() => {
      // on very small screens avoid bursts
      if (isSmall) {
        // occasional single spark
        const bid = Date.now() + Math.floor(Math.random() * 10000)
        const x = 10 + Math.random() * 80
        const y = 5 + Math.random() * 60
        const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#f97316', '#60a5fa']
        const pieces = Array.from({ length: 8 }).map(() => ({ id: Date.now() + Math.random(), dx: (Math.random() * 120) - 60, dy: (Math.random() * 80) - 40, color: colors[Math.floor(Math.random() * colors.length)] }))
        setBursts((b) => [...b, { id: bid, x, y, pieces }])
        setTimeout(() => setBursts((b) => b.filter(bt => bt.id !== bid)), 1400)
        return
      }

      const bid = Date.now() + Math.floor(Math.random() * 10000)
      const x = Math.random() * 100 // percent across the viewport
      const y = Math.random() * 100
      const count = 18 + Math.floor(Math.random() * 14)
      const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#f97316', '#60a5fa', '#7c3aed']
      const pieces = Array.from({ length: count }).map(() => ({
        id: Date.now() + Math.random(),
        dx: (Math.random() * 220) - 110,
        dy: (Math.random() * 160) - 80,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
      setBursts((b) => [...b, { id: bid, x, y, pieces }])
      // remove this burst after animation
      setTimeout(() => setBursts((b) => b.filter(bt => bt.id !== bid)), 1800)
    }, effectiveInterval)
    return () => clearInterval(timer)
  }, [interval])

  return (
    <div className="fx-overlay">
      {bursts.map((burst) => (
        <div key={burst.id} className="fx-burst" style={{ left: `${burst.x}%`, top: `${burst.y}%` }}>
          {burst.pieces.map((p) => (
            <span key={p.id} className="confetti-piece" style={{ left: `${p.dx}px`, top: `${p.dy}px`, background: p.color }} />
          ))}
          {burst.pieces.slice(0, 10).map((p) => (
            <span key={p.id + '-s'} className="spark" style={{ left: `${p.dx/1.6}px`, top: `${p.dy/1.8}px`, background: p.color }} />
          ))}
        </div>
      ))}
    </div>
  )
}
