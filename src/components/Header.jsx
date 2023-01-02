import React from 'react'
import { Box, Heading, Paragraph, Button, Anchor, Divider } from 'dracula-ui'

const Header = () => {
  return (
    <Box as='header' className='h-screen' display='flex'>
        <Box>
          <Heading as='h1' color='pinkPurple' size='2xl'>Carlos Gomez</Heading>
          <Divider color='cyan' />
          <Paragraph mt='sm' >
            Programador web
            <Button ml='sm' variant='outline'>
              <Anchor href='/cv-carlos-gomez.pdf'>Hoja de vida</Anchor>
            </Button>
          </Paragraph>
        </Box>
        <img alt="Programador concentrado en el computador" className='header-img' src="/header.svg" />
    </Box>
  )
}

export default Header