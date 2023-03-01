import React from 'react'

const CloseIcon = (props) => {
  return (
    <svg
      className="icon icon-tabler icon-tabler-circle-x"
      fill="none"
      height={40}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M10 10l4 4m0-4-4 4" />
    </svg>
  )
}

export default CloseIcon
