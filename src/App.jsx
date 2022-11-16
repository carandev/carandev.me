import React, { useEffect, useState } from 'react'

import SocialNav from './components/SocialNav'
import ProjectCard from './components/ProjectCard'

function App () {
  const [repositories, setRepositories] = useState([])

  const testRequest = async () => {
    const response = await fetch('https://api.github.com/users/carandev/repos', {
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`
      }
    })

    const data = await response.json()
    const newRepositories = []

    data.forEach(repository => {
      const description = repository.description || ''

      if (description.includes('Proyecto')) {
        newRepositories.push(repository)
      }
    })

    setRepositories(newRepositories)
  }

  useEffect(() => {
    testRequest()
  }, [])

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
      <main className='bg-slate-50 flex flex-wrap gap-4 p-4 justify-center'>
        {
          repositories.map(repository => <ProjectCard key={repository.id} project={repository} />)
        }
      </main>
    </>
  )
}

export default App
