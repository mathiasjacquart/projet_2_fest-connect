import React from 'react'

export default function ConnexionRedirection({feedback}) {
  return (
    <div> 
        {feedback && <p>{feedback}</p>}
        
    </div>
  )
}
