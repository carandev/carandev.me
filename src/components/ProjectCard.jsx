import React from 'react'
import { decode } from 'base-64'
import utf8 from 'utf8'
import { Box, Heading, Paragraph, Button, Anchor } from 'dracula-ui'

const ProjectCard = ({ repository, setReadme }) => {
  const getReadme = () => {
    fetch(`${repository.url}/readme`, {
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_KEY}`,
        Accept: 'application/vnd.github+json'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const decoded = decode(data.content)
          const utf8decoded = utf8.decode(decoded)

          setReadme(utf8decoded)
        }
        )
      }
    })
  }

  return (
    <Box className='card' color="blackSecondary" height='xs' p='md' rounded="xl" width='xs'>
      <Heading align="center" as="h3" color="cyanGreen" size="lg">{repository.name}</Heading>
      <Paragraph align='center'>{repository.description}</Paragraph>
      <Box className='buttons-container' display='flex'>
        <Button>
            <Anchor color='black' hoverColor='black' href={repository.html_url} target="_blank">Repositorio</Anchor>
        </Button>
        <Button onClick={getReadme}>
            Ver más
        </Button>
        {
          repository.homepage &&
          <Button variant='outline'>
            <Anchor color='black' hoverColor='black' href={repository.homepage} target="_blank">Demo</Anchor>
          </Button>
        }
      </Box>
      <Box />
    </Box>
  )
}

export default ProjectCard
