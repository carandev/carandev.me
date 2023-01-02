import React from 'react'
import { Box, Heading, Paragraph, Divider, Text } from 'dracula-ui'

const About = () => {
  return (
    <Box as='section' className='h-screen sct-about' width='4xl'>
          <Heading as='h2' color='cyanGreen' size='xl'>Sobre mi</Heading>
          <Divider color='purple' mb='md' />
          <Box display='flex'>
            <img alt="Persona presentando su perfil" className='header-img drac-mr-md' src="/about.svg" />
            <Paragraph className='p-about'>
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
  )
}

export default About
