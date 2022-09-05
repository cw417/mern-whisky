import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function Edit() {

  const nameRef = useRef();
  const typeRef = useRef();
  const infoRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/whisky/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const review = await response.json();
      if (!review) {
        window.alert(`Record with id ${id} not found`);
        navigate('/');
        return;
      }
      
      setInputs(review)
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
  
  function setInputs(rev) {
    nameRef.current.value = rev.name;
    typeRef.current.value = rev.type;
    infoRef.current.value = rev.info.join(', ');
  }

  function updateReview() {
    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const info = infoRef.current.value;
    const newReview = {
      name: name,
      type: type,
      info: info.split(', ')
    };
    return newReview;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedReview = updateReview();
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedReview),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/");
  }

  return (
    <div>
      <div>
        <div className='text-3xl my-4'>Edit Review</div>
        <div className='my-4'>
            <div>
              <label>Name:</label>
            </div>
            <div>
              <input className='inpt' ref={nameRef} type='text' placeholder='name' />
            </div>
            <div>
              <label>Type:</label>
            </div>
            <div>
              <input className='inpt' ref={typeRef} type='text' placeholder='type' />
            </div>
            <div>
              <label>Info:</label>
            </div>
            <div>
              <input className='inpt' ref={infoRef} type='text' placeholder='info'/>
            </div>
            <div>
              <button className='btn' onClick={onSubmit}>Update</button>
            </div>
        </div>
      </div>
    </div>
  )
}
