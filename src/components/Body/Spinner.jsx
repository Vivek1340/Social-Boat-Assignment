import React from 'react'
import './bodyStyles.css'
function Spinner() {
  return (
    <div>
      <div class="svgLoader">
      <svg>
        <circle cx="50" cy="50" r="30" fill="yellow" />
      </svg>
    </div>

    </div>
  )
}

export default Spinner
