import React from 'react'

import SocialNav from './components/SocialNav'

function App () {
  return (
    <header className='h-screen bg-slate-700 text-slate-50 flex justify-center items-center'>
      <section className='max-w-xs'>
        <h1>Carlos Gomez</h1>
        <p>
          Estudiante de ingeniería en sistemas, amante por la programación, la educación
          y el diseño. Estoy buscando trabajo, si ves que cumplo con lo que buscas
          me puedes contactar por cualquier red social o <a href="mailto:carlos@carandev.me">correo</a>
        </p>
      </section>
      <SocialNav />
    </header>
  )
}

export default App
