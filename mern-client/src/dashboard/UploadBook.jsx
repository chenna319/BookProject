import React, { useState } from 'react'
import { Button, Checkbox, Label, Textarea,TextInput } from 'flowbite-react';



const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Historical",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    'Memoir',
    "Business",
    "Education",
    "Children Books",
    "Romance",
    "Comedy",
    "Travel",
    "Religion",
    "Art and Design"
  ]

  const [selectBookCategory,setSelectedBookCategory] = useState(bookCategories[0])

  const handleChangeSelectdValue =(event)=>{
    
    setSelectedBookCategory(event.target.value)
  }

  const handleBookSubmit=(event) =>{
    event.preventDefault()
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;

    const bookObj = {
      bookTitle,authorName,imageUrl,category,bookDescription,bookPdfUrl
    }

    console.log(bookObj);

    //send data to db 
    fetch('http://localhost:5000/upload-book',
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(bookObj)
    }
    ).then(res=>res.json()).then(data=>{
      console.log(data);
      alert('Book Uploaded successfully!!!')
      form.reset();
    })

  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>
      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="bookTitle" value="Book Title" />
        </div>
        <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required />
      </div>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" name="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" type="text" placeholder="Author Name" required />
      </div>
      </div>
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageUrl" value="Image Url" />
        </div>
        <TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Image Url" required />
      </div>
      {/* Category */}
      <div className='lg:w-1/2'>
        <div className='mb-7 block'>
          <label htmlFor='inputState' value='Book Category' />
        </div>
        <select id='inputState' name='categoryName' className='w-full rounded outline-none' value={selectBookCategory} onChange={handleChangeSelectdValue}>

          {
            bookCategories.map((option)=><option key={option} value={option}>{option}</option>)
          }

        </select>
      </div>
      </div>

      {/* bookDescriptions */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookDescription" value="Book Description" />
        </div>
        <Textarea id="bookDescription" name='bookDescription' placeholder="Book Description" className='w-full' required rows={4} />
        
      </div>

      {/* bookPdf Link */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookPdfUrl" value="Book PDF Url" />
        </div>
        <TextInput id="bookPdfUrl" name="bookPdfUrl" type="text" placeholder="Book PDF Url" required />
      </div>
      
      <Button type="submit" className='mt-4'>Upload Book</Button>
    </form>
    </div>
  )
}

export default UploadBook