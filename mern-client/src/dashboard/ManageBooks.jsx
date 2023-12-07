import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'flowbite-react';

const ManageBooks = () => {
  const [allBooks,setAllBooks] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/all-books").then(res=>res.json()).then(data=>setAllBooks(data))
  },[])

  //delete a book

  const handleDelete=(id)=>{
    console.log(id)
    fetch(`http://localhost:5000/book/${id}`,{
      method: 'DELETE',
    }).then(res=>res.json()).then(data=>{alert("Book is deleted successfully!")})
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>

      <Table>
        <Table.Head>
        <Table.HeadCell>NO</Table.HeadCell>
          <Table.HeadCell>BOOK NAME</Table.HeadCell>
          <Table.HeadCell>AUTHOR NAME</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>PRICES</Table.HeadCell>
          <Table.HeadCell>EDIT OR MANAGE
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {
          allBooks.map((book,index)=><Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index}
            </Table.Cell>
            <Table.Cell>{book.bookTitle}</Table.Cell>
            <Table.Cell>{book.authorName}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>$10.00</Table.Cell>
            <Table.Cell>
              <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              to={`/admin/dashboard/edit-books/${book._id}`}
              >
                Edit
              </Link>
              <button onClick={()=>handleDelete(book._id)} className='bg-red-600 px-1 font-semibold text-white rounded-sm mr-5 hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
          </Table.Body>)
        }
      </Table>
    </div>
  )
}

export default ManageBooks