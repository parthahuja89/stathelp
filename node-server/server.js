const express = require('express');
const app = express(); 

const utils = require('./utilities');

const port = 5000 

app.get('/', (req, res) => res.send('Hello this is the stathelp server'))

//Utility calculations
app.get('/range', (req, res) => res.send(utils.range()))


app.listen(port, () => console.log(`Server running on port ${port}!`))