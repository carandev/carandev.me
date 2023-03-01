import React, { useState } from 'react'
import { Box, Divider, Heading } from 'dracula-ui'

import ProjectCard from './ProjectCard'
import ProjectAbout from './ProjectAbout'

const Projects = ({ repositories }) => {
  const [readme, setReadme] = useState(null)

  return (
    <Box as="section" className="h-screen sct-projects" width='4xl'>
          <Heading as="h2" className='title-projects' color="cyanGreen">Proyectos</Heading>
          <Divider color='purple' mb='md' />
          <Box className="container-projects" mt='md' p='md'>
            {
              repositories.map(repository => <ProjectCard key={repository.id} repository={repository} setReadme={setReadme} />)
            }
          </Box>
          {readme && <ProjectAbout readme={readme} setReadme={setReadme} />}
    </Box>
  )
}

export default Projects
