/*
bcrypt, 
JWT+쿠키 + session(study),
string boot, //https://www.codestates.com/blog/content/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8
google signup+login,

security
1. harded coded link,uri
2. https
3. refresh token
4. csrf
5. nosql attack
*/
const express = require('express')
, rateLimit = require('express-rate-limit')
, http = require('http')
, path = require('path')
, static = require('serve-static')
, mongoose = require('mongoose')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, jwt = require('jsonwebtoken')
, bcrypt = require('bcrypt');


//const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 80
const uri = "mongodb+srv://meaterick:qwe123VVBPLK09meate@firstdb.nye4r.mongodb.net/?retryWrites=true&w=majority&appName=firstDB";
const SECRET_KEY = 's93mr8MS8wuu6ageo048C';
const saltRounds = 10;

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

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per 15 minutes
    message: "Too many login attempts, please try again after 1 minutes.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
});

app.get('/indexpage', (req, res) => {//쿠키,캐쉬 보안필요
  const token = req.cookies['login_token'];
  const rrr = req.body.pwd;
  console.log(rrr)
  if (token) {
      try {
          const decoded = jwt.verify(token, SECRET_KEY);
          res.send(`Hello ${decoded.username}, welcome to the index page!`);
      } catch (err) {
          res.status(401).send('Invalid or expired token.');
      }
  } else {
      res.status(400).send('No token found.');
  }
})

app.post('/signup', async (req, res) => {
  const password = req.body.pwd;
  const id = req.body.id;
  
  mongoose.connect(uri)
  const db = mongoose.connection;

  db.once('open', async function() {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ ID: id });
    
      if (user == null) {
        const userSchema = new mongoose.Schema({
          ID: String,
          PWD: String,
        });
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const User = mongoose.model('User', userSchema);
        
        const newUser = new User({
          ID: id,
          PWD: hashedPassword,
        });
        await newUser.save();
        
        res.send("done");//redirect code
      } else {
        res.send("id already exist. try again.");
      }
    mongoose.connection.close();
    });
  
});

app.post('/login', loginLimiter, (req, res) => {
    const password = req.body.pwd;
    const id = req.body.id;

    mongoose.connect(uri)
    const db = mongoose.connection;

    db.once('open', async function() {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ ID: id });

      if (user == null) {
        res.redirect('/signup');
      } else {
        const passwordMatches = await bcrypt.compare(password, user.PWD);
        if (passwordMatches) {
          
          const token = jwt.sign({ username: id}, SECRET_KEY, { expiresIn: '1h' });
          res.cookie('login_token', token, { httpOnly: true, maxAge: 3600000 });
          //res.json({ token });
          res.redirect('/indexpage');
        } else {
          res.send('wrong');
        }
      }
      mongoose.connection.close();
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
