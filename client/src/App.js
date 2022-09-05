import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Create from './components/Create';
import ReviewList from './components/ReviewList'
import Edit from './components/Edit';
 
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<ReviewList />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
};