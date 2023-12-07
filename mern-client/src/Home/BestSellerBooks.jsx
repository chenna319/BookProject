import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'

const BestSellerBooks = () => {
    const [books,setBooks] = useState([])

    useEffect(()=>{
      fetch('http://localhost:5000/all-books').then(res=>res.json()).then(data=>setBooks(data.slice(0,8)))
      
    },[]);
    
    
  return (
    <BookCard books={books} headline="Best Seller Books"/>
  )
}

export default BestSellerBooks