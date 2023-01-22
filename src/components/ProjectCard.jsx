import React from 'react'
import { Box, Heading, Paragraph, Button, Anchor } from 'dracula-ui'

const ProjectCard = ({ repository }) => {
  return (
    <Box className='card' color="blackSecondary" height='xs' p='md' rounded="xl" width='xs'>
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

export default ProjectCard
