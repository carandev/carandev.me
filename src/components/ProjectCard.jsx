import React from 'react'

const ProjectCard = ({ project }) => {
  return (
    <section className='bg-slate-700 w-80 rounded p-4 flex flex-col gap-4 justify-between'>
      <h3
        className='text-blue-300 font-bold'
      >
        {project.name.toUpperCase()}
      </h3>
      <p className='text-slate-50'>
        {project.description}
      </p>
      <p className='text-slate-50'>
        <span className='font-bold'>Lenguajes:</span> {project.language}
      </p>
      <div className='flex gap-4 justify-around'>
        {
        project.homepage !== '' &&
          <a
            className='bg-cyan-700 px-4 py-2 rounded'
            href={`${project.homepage}`}
            rel="noreferrer" target='_blank'
          >
            Website
          </a>
        }
        <a className='bg-slate-400 px-4 py-2 rounded' href={project.html_url}>Code</a>
      </div>
    </section>
  )
}

export default ProjectCard
