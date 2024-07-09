import React from 'react'
import RegisterForm from './RegisterForm'
import styles from "./Register.module.scss"

export default function Register() {
  return (
    <div>
      <RegisterForm/>
      <div className={`${styles.RegisterContainer} d-flex container flex-column`}>
          <h3>Pourquoi nous choisir ?  </h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          <div className='d-flex flex-row'> 
            <div className=>

            </div>
            <div></div>
          </div>
      </div>
    </div>
  )
}
