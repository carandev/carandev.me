import React from 'react'
import { Box, Anchor } from 'dracula-ui'

const SocialBar = () => {
  return (
    <Box as='nav' className='nav' color='animated'>
        <Anchor href="https://github.com/carandev" target="_blank"><img src="/github.svg" width={30}/></Anchor>
        <Anchor href="https://twitter.com/carandev" target="_blank"><img src="/twitter.svg" width={30}/></Anchor>
        <Anchor href="https://linkedin.com/in/carandev" target="_blank"><img src="/linkedin.svg" width={30}/></Anchor>
        <Anchor href="https://instagram.com/caran.dev" target="_blank"><img src="/instagram.svg" width={30}/></Anchor>
        <Anchor href="mailto:carlosandres0741@gmail.com" target="_blank"><img src="/mail.svg" width={30}/></Anchor>
    </Box>
  )
}

export default SocialBar
