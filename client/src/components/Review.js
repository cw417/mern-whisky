import React from 'react';

export default function Review({ review }) {


  function displayInfo() {
    return (
      review.info.map((item, index) => {
        return (
        <div className='ml-6' key={index}>
          {item}
        </div>
        )
      })
    )
  }

  return (
    <div className='my-4'>
      <div>
        {review.name} <span className='ml-2'>({review.type})</span>
      </div>
      <div>
        <div className='ml-4'>
          <div>{displayInfo()}</div>
        </div>
      </div>
    </div>
  )
}
