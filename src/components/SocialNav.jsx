import React from 'react'
import { FiMail, FaGithub, FaLinkedin, FaTwitch, FaTwitter } from 'react-icons/all'

const SocialNav = () => {
  return (
    <nav className='w-fit absolute left-0 shadow-white rounded shadow p-2 flex flex-col gap-4'>
      <a href='https://twitch.tv/carandev'>
        <FaTwitch />
      </a>
      <a href='https://github.com/carandev'>
        <FaGithub />
      </a>
      <a href='https://linkedin.com/in/carandev'>
        <FaLinkedin />
      </a>
      <a href='https://twitter.com/carandev'>
        <FaTwitter />
      </a>
      <a href="mailto:carlos@carandev.me">
        <FiMail />
      </a>
    </nav>
  )
}

export default SocialNav
