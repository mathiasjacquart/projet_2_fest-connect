import React from 'react'

export default function AdminConnexionRedirection(feedback) {
  return (
    <div>
        {feedback && <p>{feedback}</p>}
    </div>
  )
}
