# Invitación XV (Vite + React + Tailwind)

Proyecto ejemplo que muestra una invitación personalizada usando rutas dinámicas y `HashRouter`, para que funcione en GitHub Pages.

Archivos principales añadidos:

- `src/main.jsx` - entrada
- `src/App.jsx` - rutas (HashRouter)
- `src/Invitacion.jsx` - componente de invitación que busca en `invitados.json`
- `invitados.json` - datos de invitados
- `vite.config.js` - base configurada para GitHub Pages

Instalación y uso:

1. Instala dependencias:

```cmd
npm install
```

2. Ejecuta en desarrollo:

```cmd
npm run dev
```

3. Build:

```cmd
npm run build
```

Notas sobre rutas en GitHub Pages:

- La app usa `HashRouter`, por lo que las URL son del tipo `https://usuario.github.io/invitacion/#/invitacion/Fulana`.
- En `vite.config.js` la opción `base` está configurada a `/invitacion/`. Ajusta si tu repositorio tiene otro nombre.

Reemplaza `public/fondo.jpg` por la imagen de fondo que prefieras.

Se añadió:
- Google Fonts (Playfair Display e Inter) en `index.html`.
- `public/fondo.svg` como fondo decorativo por defecto. Puedes sustituir o mantener ambos (`fondo.svg` y `fondo.jpg`).

Funcionalidad añadida:
- RSVP local: en la página de invitación puedes confirmar "Asistiré", "Quizá" o "No podré"; la respuesta se guarda en `localStorage` y se muestra el estado.

Prueba RSVP:
- Abre `http://localhost:5173/invitacion/#/invitacion/Fulana`, pulsa una opción y recarga para ver que se mantiene en el navegador.
