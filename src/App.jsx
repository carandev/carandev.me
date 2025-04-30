import React, { useState, useEffect } from 'react'
import 'dracula-ui/styles/dracula-ui.css'
import { Box } from 'dracula-ui'

import { SocialBar, Header, About, Projects, Footer } from './components'

function App () {
  const [repositories, setRepositories] = useState([])

  const repoRequest = async () => {
    const response = await fetch('https://api.github.com/users/carandev/repos?sort=commits')

    const data = await response.json()
    const newRepositories = []

    data.forEach(repository => {
      if (repository.homepage) {
        newRepositories.push(repository)
      }
    })

    setRepositories(newRepositories)
  }

  useEffect(() => {
    repoRequest()
  }, [])

  return (
    <Box className='h-screen' color='black' scrollbar="cyan">
      <SocialBar />
      <Header />
      <Box as='main' style={{ position: 'relative' }}>
        <About />
        <Projects repositories={repositories} />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
