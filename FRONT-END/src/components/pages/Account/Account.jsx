import React from 'react'
import styles from "./Account.module.scss"
import { useLoaderData, useParams } from "react-router-dom"

export default function Account() {
  const params = useParams();
  const user = useLoaderData();
  return (
    <div className={`mh-100 ${styles.Account}`}>
      <h3>Informations personnelles</h3>
      <div className={`mh-100 ${styles.AccountContainer}`}>

      </div>
    </div>
  )
}
