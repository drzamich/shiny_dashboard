import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Loading() {
  return (
    <div className="loading loading__container">
      <FontAwesomeIcon icon={faSpinner} size="3x" />
    </div>
  );
}
