const express = require('express')
, http = require('http')
, path = require('path')
, static = require('serve-static')
, mongoose = require('mongoose');

//const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 80

const uri = "mongodb+srv://meaterick:qwe123VVBPLK09meate@firstdb.nye4r.mongodb.net/?retryWrites=true&w=majority&appName=firstDB";
mongoose.connect(uri)
User.find({ID:'meaterick'}).select('PWD').then((val) => console.log(val));

/*
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'main.html'));
})

app.post('/submit', (req, res) => {
    const password = req.body.pwd;
    
    if (password.toString() == "chichiiscute") {
        res.sendFile(path.join(__dirname, 'src', 'first.html')); 
    } else {
        res.send('wrong');
    }
})

app.listen(port, () =>{
    console.log(`TEST ${port}`)
})
