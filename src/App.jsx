import React from 'react'

import SocialNav from './components/SocialNav'

function App () {
  return (
    <>

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
      <main className='bg-slate-50 flex flex-wrap gap-4 p-4'>
        <section className='bg-slate-700 w-80 rounded p-4 flex flex-col gap-4'>
          <h3>Adviency</h3>
          <p className='text-slate-50'>
            Proyecto propuesto por
            <a href="https://twitter.com/goncy" rel="noreferrer" target='_blank'> @goncy </a>
            para comprobar las habilidades en react y tener una app útil para
            llevar la lista de los regalos que damos en navidad.
          </p>
          <div className='flex gap-4'>
            <a className='bg-cyan-700 px-4 py-2 rounded' href="https://adviency.carandev.me">Website</a>
            <a className='bg-slate-400 px-4 py-2 rounded' href="https://github.com/carandev/adviency">Code</a>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
