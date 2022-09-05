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
  
  // This method will delete a record
  async function deleteReview(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });

   const newReviews = reviews.filter((el) => el._id !== id);
   setReviews(newReviews);
  }

  function reviewList() {
    return reviews.map((review, index) => {
      return (
        <Review 
          key={index}
          review={review}
          deleteReview={deleteReview}
        />
      )
    })
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='text-3xl mt-2 my-6'>
        Reviews
      </div> 
      <div>{reviewList()}</div>

    </div>
  )
}
