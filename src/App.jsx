import React, { useState, useEffect } from 'react'
import 'dracula-ui/styles/dracula-ui.css'
import { Box } from 'dracula-ui'

import SocialBar from './components/SocialBar'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App () {
  const [repositories, setRepositories] = useState([])

  const repoRequest = async () => {
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
    repoRequest()
  }, [])

  return (
    <Box className='h-screen' color='black' scrollbar="cyan">
      <SocialBar />
      <Header />
      <Box as='main'>
        <About />
        <Projects repositories={repositories} />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
