import React from 'react'
import ReactMarkdown from 'react-markdown'

const ProjectAbout = ({ readme }) => {
  return (
    <ReactMarkdown>
        {readme}
    </ReactMarkdown>
  )
}

export default ProjectAbout
