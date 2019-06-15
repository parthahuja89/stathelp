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

app.get('/median', (req, res) =>  res.json(
        {"Answer": String(utils.median(req.query.values))}
))

app.get('/Arithmetic_Mean', (req, res) =>  res.json(
        {"Answer": String(utils.mean(req.query.values))}
))

app.get('/Geometric_Mean', (req, res) =>  res.json(
        {"Answer": String(utils.geoMean(req.query.values))}
))

app.get('/Harmonic_Mean', (req, res) =>  res.json(
        {"Answer": String(utils.harmMean(req.query.values))}
))

app.get('/Quadratic_Mean', (req, res) =>  res.json(
        {"Answer": String(utils.quadMean(req.query.values))}
))

app.get('/Variance', (req, res) =>  res.json(
        {"Answer": String(utils.variance(req.query.values))}
))

app.get('/Variance_Sample', (req, res) =>  res.json(
        {"Answer": String(utils.sampleVariance(req.query.values))}
))

app.get('/Standard_Deviation_Population', (req, res) =>  res.json(
        {"Answer": String(utils.standardDevPop(req.query.values))}
))

app.get('/Standard_Deviation_Sample', (req, res) =>  res.json(
        {"Answer": String(utils.standardDevSample(req.query.values))}
))

app.get('/Standard_Error', (req, res) =>  res.json(
        {"Answer": String(utils.standardError(req.query.values))}
))

app.listen(port, () => console.log(`Server running on port ${port}!`))

