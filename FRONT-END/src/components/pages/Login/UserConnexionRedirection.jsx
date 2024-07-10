import React from 'react'

export default function ConnexionRedirection({feedback}) {
  return (
    <div style={{width:"100%", height:"100%", color:'#D90429', fontSize:"1.2em", textAlign:'center', paddingTop:"30px"}} className='d-flex '> 
       <div>{feedback && <p>{feedback}</p>}</div> 
        
    </div>
  )
}
