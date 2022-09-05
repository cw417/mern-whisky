import React, { useRef } from 'react'
import { FiSearch, FiRotateCcw } from 'react-icons/fi';

export default function SearchBar({ searchList, filter, toggleFilter }) {

  const searchRef = useRef()

  function handleSearch() {
    if (searchRef.current.value === '') return;
    if (filter) toggleFilter();
    searchList(searchRef.current.value);
  }

  function handleRestore() {
   if (filter) {toggleFilter()};
  }

  return (
    <>
      <div className='flex flex-row items-center mt-2'>
        <input ref={searchRef} className='inpt w-full' type='text' placeholder='Search' />
        <button className='btn' onClick={handleSearch}><FiSearch /></button>
        <button className='btn' onClick={handleRestore}><FiRotateCcw /></button>
      </div>
    </>
  )
}
