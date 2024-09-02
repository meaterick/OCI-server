const express = require('express')
, http = require('http')
, path = require('path')
, static = require('serve-static');

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 80

const uri = "mongodb+srv://meaterick:qwe123VVBPLK09meate@firstdb.nye4r.mongodb.net/?retryWrites=true&w=majority&appName=firstDB";

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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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
