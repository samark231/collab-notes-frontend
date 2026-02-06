import React from 'react'
import "../../styles/app.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
  return (
    <div className='loading-page'>
        <div className='lp-text'>Loading your Journals</div>
        <FontAwesomeIcon icon={faSpinner} spin={true} fontSize="30px"/>
    </div>
    

  )
}

export default Loading
