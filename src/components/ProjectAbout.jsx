import { Box } from 'dracula-ui'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import CloseIcon from './CloseIcon'

const ProjectAbout = ({ readme, setReadme }) => {
  const closePreview = () => {
    setReadme(null)
  }

  return (
    <Box className='preview-container' color='black'>
      <Box className='preview-close' onClick={closePreview}><CloseIcon/></Box>
      <ReactMarkdown className='markdown'>
        {readme}
      </ReactMarkdown>
    </Box>
  )
}

export default ProjectAbout
