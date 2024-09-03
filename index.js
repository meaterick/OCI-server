const express = require('express')
, http = require('http')
, path = require('path')
, static = require('serve-static')
, mongoose = require('mongoose');

//const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 80

const uri = "mongodb+srv://meaterick:qwe123VVBPLK09meate@firstdb.nye4r.mongodb.net/?retryWrites=true&w=majority&appName=firstDB";

//User.find({ID:'meaterick'}).select('PWD').then((val) => console.log(val));

/** this codes are another code to first mongodb setting
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
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});


app.post('/signup', (req, res) => {
  const password = req.body.pwd;
  const id = req.body.id;

  mongoose.connect(uri)
  const db = mongoose.connection;
  
  db.once('open', async function() {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ ID: id });

      if (user == null) {
        res.send("done");//signup code
      } else {
        res.send("id already exist. try again.");
      }
      mongoose.connection.close();
    });
  
});

app.post('/login', (req, res) => {
    const password = req.body.pwd;
    const id = req.body.id;

    mongoose.connect(uri)
    const db = mongoose.connection;
  
    db.once('open', async function() {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ ID: id });

      if (user == null) {
        res.send("sign up");
      } else {
        if (password.toString() == user.PWD) {
          res.send("same");
          //res.redirect('/indexpage');
        } else {
          res.send('wrong');
        }
      }
      mongoose.connection.close();
    });
})
/*
app.post('/indexpage', (req, res) => {//쿠키,캐쉬 보안필요
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
})
*/
app.listen(port, () =>{
    console.log(`TEST ${port}`)
})
