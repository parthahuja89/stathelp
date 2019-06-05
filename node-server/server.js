const express = require('express');
const app = express(); 
const port = 5000 
var cors = require('cors')

//importing functions from other files 
const utils = require('./utilities');


app.use(cors())
app.get('/', (req, res) => res.json({"Welcome": "To the stathelp server!"}))

//Utility calculations

/**
 * GET Request format: host:operation_req?json
 * Input Json:  {values: comma_separated_values}
 * Response Json: {answer: range}
 */
app.get('/range', (req, res) =>  res.json(
        {"Answer": String(utils.range(req.query.values))}
))

app.get('/mode', (req, res) =>  res.json(
        {"Answer": String(utils.mode(req.query.values))}
))

app.listen(port, () => console.log(`Server running on port ${port}!`))

