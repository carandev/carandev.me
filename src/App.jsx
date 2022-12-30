import React, { useState, useEffect } from 'react'
import 'dracula-ui/styles/dracula-ui.css'
import { Text, Box, Divider, Heading, Paragraph, Button, Anchor } from 'dracula-ui'

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
    <Box className='h-screen' color='black' scrollbar="cyan">
      <Box as='nav' className='nav' color='animated'>
        <Anchor href="https://github.com/carandev" target="_blank"><img src="/github.svg" width={30}/></Anchor>
        <Anchor href="https://twitter.com/carandev" target="_blank"><img src="/twitter.svg" width={30}/></Anchor>
        <Anchor href="https://linkedin.com/in/carandev" target="_blank"><img src="/linkedin.svg" width={30}/></Anchor>
        <Anchor href="https://instagram.com/caran.dev" target="_blank"><img src="/instagram.svg" width={30}/></Anchor>
        <Anchor href="https://wa.me/+573188822805" target="_blank"><img src="/mail.svg" width={30}/></Anchor>
      </Box>
      <Box as='header' className='h-screen' display='flex'>
        <Box>
          <Heading as='h1' color='pinkPurple' size='2xl'>Carlos Gomez</Heading>
          <Divider color='cyan' />
          <Paragraph mt='sm' >
            Programador web
          </Paragraph>
        </Box>
        <img alt="Programador concentrado en el computador" className='header-img' src="/header.svg" />
      </Box>
      <Box as='main'>
        <Box as='section' className='h-screen sct-about' width='4xl'>
          <Heading as='h2' color='cyanGreen' size='xl'>Sobre mi</Heading>
          <Divider color='purple' mb='md' />
          <Box display='flex'>
            <img alt="Persona presentando su perfil" className='header-img drac-mr-md' src="/about.svg" />
            <Paragraph>
            Mi nombre es Carlos Gomez, soy estudiante de ingeniería en sistemas en la UTS
            y egresado del proyecto Misión TIC 2021. Soy programador web enfocado en lenguajes
            de programación como <Text color='purple'>JavaScript</Text>,
            <Text color='purple'> Python</Text> y <Text color='purple'>Java</Text>,
            con frameworks como <Text color='cyan'>React</Text>, <Text color='green'>Vue</Text>,
            <Text color='purple'> Node</Text>, <Text color='purple'>Flask</Text> y
            <Text color='purple'> Spring Boot</Text>, también tengo conocimientos básicos de
            <Text color='purple'> Docker</Text>, <Text color='purple'>Git</Text>,
            <Text color='purple'> Github</Text> y <Text color='purple'>Linux</Text>.
            Me apasiona la programación y estoy en constante aprendizaje con curiosidad por
            nuevas tecnologías, estoy dispuesto a cambiar el mundo con soluciones que aporten
            valor y espero de tu empresa obtener la experiencia y la motivación necesaria
            para lograrlo.
            </Paragraph>
          </Box>
        </Box>
        <Box as="section" className="h-screen" width='4xl'>
          <Heading as="h2" className='title-projects' color="cyanGreen">Proyectos</Heading>
          <Divider color='purple' mb='md' />
          <Box className="sct-projects" mt='md' p='md'>
            {
              repositories.map(repository =>
                <Box key={repository.id} className='card' color="blackSecondary" height='xs' p='md' rounded="xl" width='xs'>
                  <Heading align="center" as="h3" color="cyanGreen" size="lg">{repository.name}</Heading>
                  <Paragraph align='center'>{repository.description}</Paragraph>
                  <Box className='buttons-container' display='flex'>
                    <Button>
                        <Anchor color='black' href={repository.html_url} target="_blank">Ver</Anchor>
                    </Button>
                    {
                      repository.homepage &&
                      <Button variant='outline'>
                        <Anchor href={repository.homepage} target="_blank">Demo</Anchor>
                      </Button>
                    }
                  </Box>
                </Box>
              )
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
