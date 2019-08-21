const express = require('express');
//import db.js
const connectDB = require('./config/db');
const path = require('path');


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended:false }));

//To send data, we can do res.send,res.sendFile or res.json
// app.get('/',(req, res) => 
//     res.json({ msg: 'Welcome to the ContactKeeper API' })
// );

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Deploy, Server static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    //hit the homepage and load index.html in client/build/oindex.html
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //open postman and try GET http://localhost:5000, cannot get /
