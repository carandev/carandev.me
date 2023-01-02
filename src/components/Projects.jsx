import React from 'react'
import { Box, Divider, Heading } from 'dracula-ui'

import ProjectCard from './ProjectCard'

const Projects = ({ repositories }) => {
  return (
    <Box as="section" className="h-screen" width='4xl'>
          <Heading as="h2" className='title-projects' color="cyanGreen">Proyectos</Heading>
          <Divider color='purple' mb='md' />
          <Box className="sct-projects" mt='md' p='md'>
            {
              repositories.map(repository => <ProjectCard key={repository.id} repository={repository} />)
            }
          </Box>
    </Box>
  )
}

export default Projects
