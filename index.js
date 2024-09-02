const express = require('express')
, http = require('http')
, path = require('path')
, static = require('serve-static');

//const { MongoClient } = require("mongodb");
const app = express()
const port = 80

//const url = "mongodb+srv://meaterick:qwe123VVBPLK09meate@firstdb.nye4r.mongodb.net/?retryWrites=true&w=majority&appName=firstDB";
//const client = new MongoClient(url);
/*
async function run() {
  try {
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
    
    if (password.toString() == "chichi1..") {
        res.sendFile(path.join(__dirname, 'src', 'first.html')); 
    } else {
        res.send('wrong');
    }
})

app.listen(port, () =>{
    console.log(`TEST ${port}`)
})
