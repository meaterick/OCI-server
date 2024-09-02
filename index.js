const express = require('express')
, http = require('http')
, path = require('path')
, static = require('serve-static');

const app = express();
const port = 80

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

const test = 10;
