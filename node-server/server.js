const express = require('express');
const app = express(); 
const port = 5000 
var cors = require('cors')

//importing functions from other files 
const utils = require('./utilities');
const bio = require('./Distributions/Bionomial');
const norm = require('./Distributions/Normal'); 
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

/**
 * Distribution Calculations 
 */

 /**
  * Bionomial Distribution
  * GET Request payload: 
  *     {success: '0<=X<=1', trial_count: '1->INF' , x: 'num of success'}
  * Response payload: 
  *     {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
  */
app.get('/Bionomial', (req, res) =>  res.json(
        {"Answer": Number(bio.bionomial(req.query.success, req.query.trial_count, req.query.x)),
        "Answer_lt": Number(bio.bionomial_lt(req.query.success, req.query.trial_count, req.query.x)),
        "Answer_lt_eq": Number(bio.bionomial_lt_eq(req.query.success, req.query.trial_count, req.query.x)),
        "Answer_gt": Number(bio.bionomial_gt(req.query.success, req.query.trial_count, req.query.x)),
        "Answer_gt_eq": Number(bio.bionomial_gt_eq(req.query.success, req.query.trial_count, req.query.x))
        }
))

 /**
  * Normal Distribution
  * GET Request payload: 
  *     {z_score, mean, standard_dev}
  * Response payload: 
  *     {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
  */
 app.get('/Normal', (req, res) =>  res.json(
        {"Answer": norm.normal(req.query.z_score, req.query.mean, req.query.standard_dev),
        }
))



app.listen(port, () => console.log(`Server running on port ${port}!`))

