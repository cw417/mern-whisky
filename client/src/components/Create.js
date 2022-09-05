import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

export default function Create() {

  const nameRef = useRef();
  const typeRef = useRef();
  const infoRef = useRef();

  const navigate = useNavigate();

  // Handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newReview = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      info: infoRef.current.value.split(/[\s,\s]+/)
    }
  
    await fetch('http://localhost:5000/whisky/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    nameRef.current.value = null;
    typeRef.current.value = null;
    infoRef.current.value = null;

    navigate('/');
  }
  return (
    <div>
      <div>
        <div className='text-3xl my-4'>Create Review</div>
        <div className='my-4'>
            <div>
              <label>Name:</label>
            </div>
            <div>
              <input className='inpt' ref={nameRef} type='text' />
            </div>
            <div>
              <label>Type:</label>
            </div>
            <div>
              <input className='inpt' ref={typeRef} type='text' />
            </div>
            <div>
              <label>Info:</label>
            </div>
            <div>
              <input className='inpt' ref={infoRef} type='text' />
            </div>
            <div>
              <button className='btn' onClick={onSubmit}>Create</button>
            </div>
        </div>
      </div>
    </div>
  )
}
