const express = require('express');

const app = express();

//To send data, we can do res.send,res.sendFile or res.json
app.get('/',(req, res) => 
    res.json({ msg: 'Welcome to the ContactKeeper API' })
);

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on port ${PORT}')); //open postman and try GET http://localhost:5000, cannot get /
