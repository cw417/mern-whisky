import React, { useState, useEffect } from 'react';
import Review from './Review';
import SearchBar from './SearchBar';

export default function WhiskyList() {

  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState(false)

  // Get reviews from the server
  useEffect(() => {
    if (!filter) {
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
    }
  }, [reviews.length, filter]);
  
  // This method will delete a record
  async function deleteReview(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });

   const newReviews = reviews.filter((el) => el._id !== id);
   setReviews(newReviews);
  }

  function searchList(keyword) {
    const newReviews = reviews.filter(review => 
      review.name.includes(keyword) || 
      review.type.includes(keyword) || 
      review.info.includes(keyword)
    );
    setFilter(true);
    setReviews(newReviews);
  }

  function toggleFilter() {
    const newFilter = !filter;
    setFilter(newFilter)
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
      <div className='text-3xl mt-6 mb-2'>
        Reviews
      </div> 
      <SearchBar 
        reviews={reviews}
        filter={filter}
        searchList={searchList}
        toggleFilter={toggleFilter}
      />
      <div>{reviewList()}</div>
    </div>
  )
}
