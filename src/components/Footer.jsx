import { Box, Text } from 'dracula-ui'
import React from 'react'

const Footer = () => {
  return (
    <Box as='footer'>
        <Text align='center'>{new Date().getFullYear()} | carandev</Text>
    </Box>
  )
}

export default Footer
