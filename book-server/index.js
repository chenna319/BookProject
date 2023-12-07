const express = require('express');
const app = express();
const port = process.env.PORT||5000
const cors = require('cors');

//middleware

app.use(cors());
app.use(express.json());

//mongo db


const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://book-store:vemulapalli@cluster0.htmp864.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection of documents

    const bookCollections = client.db('BookInventory').collection('books');

    //insert a book to the database use post method

    app.post('/upload-book', async (req,res)=>{
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.send(result);
    })

    //get all books 

    app.get('/all-books', async (req,res)=>{
        const books = bookCollections.find()
        const result = await books.toArray();
        res.send(result);
    })

    //get a single book 

    app.get('/book/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)};
      const result = await bookCollections.findOne(filter);
      res.send(result)
    })

    //updata a book data we use patch method 

    app.patch('/book/:id', async (req,res)=>{
        const id = req.params.id;
        // console.log(id)
        const updatedBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert:true};
        const updateDoc= {
            $set:{
                ...updatedBookData
            }
        }

        const result = await bookCollections.updateOne(filter,updateDoc,options);
        res.send(result);



        })

        //delete method 

        app.delete('/book/:id', async (req,res)=>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await bookCollections.deleteOne(filter)
            res.send(result);
        })

        //filter by category

        app.get('/all-books', async (req,res)=>{
            let query = {};
            if(req.query?.category){
                query = {category: req.query.category}
            }
            const result = await bookCollections.find(query).toArray()
            res.send(result)
        })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})