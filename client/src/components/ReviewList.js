import React, { useState, useEffect } from 'react';
import Review from './Review';

export default function WhiskyList() {

  const [reviews, setReviews] = useState([]);

  // Get reviews from the server
  useEffect(() => {
    async function getReviews() {
      const response = await fetch(`http://localhost:5000/whisky/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const reviews = await response.json();
      setReviews(reviews);
    }
  
    getReviews();
  
    return;
  }, [reviews.length]);

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
      <div>{reviewList()}</div>

    </div>
  )
}
