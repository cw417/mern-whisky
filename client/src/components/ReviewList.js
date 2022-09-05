import React, { useState, useEffect } from 'react';
import Review from './Review';

export default function WhiskyList() {

  const [reviews, setReviews] = useState([]);

  function reviewList() {
    return reviews.map((review, index) => {
      return (
        <Review 
          key={index}
          review={review}
        />
      )
    })
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='text-3xl'>
        Reviews
      </div>

    </div>
  )
}
