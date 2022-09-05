import React from 'react';
import { FiTrash, FiEdit }from 'react-icons/fi'
import { Link } from 'react-router-dom';

export default function Review({ review, deleteReview }) {

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
      <div className='flex flex-row items-center'>
        <div>
          {review.name} <span className='mx-2'>({review.type})</span>
        </div>
        <div>
          <Link to={`/edit/${review._id}`}>
            <div className='btn'>
              <FiEdit />
            </div>
          </Link>
        </div>
        <div>
          <button className='btn' onClick={() => deleteReview(review._id)}><FiTrash /></button>
        </div>
      </div>
      <div>
        <div className='ml-4'>
          <div>{displayInfo()}</div>
        </div>
      </div>
    </div>
  )
}
