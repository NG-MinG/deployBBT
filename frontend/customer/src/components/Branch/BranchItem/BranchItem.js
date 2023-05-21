import React from 'react'
import styles from './BranchItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
export default function BranchItem({ value }) {
  // console.log(value)
  return (
    <div className={styles.BranchItem}>
      <p className={styles.title}>{value.location}</p>
      {value.stations.map((values, index) => (
        <div className={styles.items}>
          <div className={`${styles.item} ${styles.address}`}>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: '#000', fontSize: '2rem' }} />
            <p>{values.address}</p>
          </div>
          <div className={`${styles.item} ${styles.phone}`}>
            <FontAwesomeIcon icon={faPhone} style={{ color: '#000', fontSize: '1.9rem' }} />
            <p>{values.phone}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
