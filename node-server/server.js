const express = require('express');
const app = express(); 
const port = 5000 
var cors = require('cors')

//importing functions from other files 
const utils = require('./utilities');
const bio = require('./Distributions/Bionomial');
const norm = require('./Distributions/Normal'); 
const hyper = require('./Distributions/Hyper');
const poisson = require('./Distributions/Poisson');
const chi = require('./Distributions/Chi');
const geo = require('./Distributions/Geometric');

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

 /**
  * Hypergeometric Distribution
  * GET Request payload: 
  *     {population_size, population_success, sample_size, sample_success}
  * Response payload: 
  *     {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
  */

 app.get('/Hyper', (req, res) =>  res.json(
        {"Answer": hyper.Hypergeometric(req.query.population_size,
                                        req.query.population_success, 
                                        req.query.sample_size, 
                                        req.query.sample_success
                                        ).toFixed(req.query.rounding),

        "Answer_lt": hyper.Hypergeometric_lt(req.query.population_size,
                                             req.query.population_success, 
                                             req.query.sample_size, 
                                             req.query.sample_success
                                        ).toFixed(req.query.rounding),
        
        "Answer_lt_eq": hyper.Hypergeometric_lt_eq(req.query.population_size,
                                                req.query.population_success, 
                                                req.query.sample_size, 
                                                req.query.sample_success
                                        ).toFixed(req.query.rounding),

        "Answer_gt_eq": hyper.Hypergeometric_gt_eq(req.query.population_size,
                                                req.query.population_success, 
                                                req.query.sample_size, 
                                                req.query.sample_success
                                        ).toFixed(req.query.rounding),

        "Answer_gt": hyper.Hypergeometric_gt(req.query.population_size,
                                             req.query.population_success, 
                                             req.query.sample_size, 
                                             req.query.sample_success
                                        ).toFixed(req.query.rounding),
        }
))


app.listen(port, () => console.log(`Server running on port ${port}!`))

/**
  * Poisson Distribution
  * GET Request payload: 
  *     {average, x}
  * Response payload: 
  *     {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
  */
 app.get('/Poisson', (req, res) =>  res.json(
        {"Answer": poisson.Poisson(req.query.average, req.query.x, req.query.rounding).toFixed(req.query.rounding),
        "Answer_lt": poisson.Poisson_lt(req.query.average, req.query.x, req.query.rounding).toFixed(req.query.rounding),
        "Answer_lt_eq": poisson.Poisson_lt_eq(req.query.average, req.query.x, req.query.rounding).toFixed(req.query.rounding),
        "Answer_gt": poisson.Poisson_gt(req.query.average, req.query.x, req.query.rounding).toFixed(req.query.rounding),
        "Answer_gt_eq": poisson.Poisson_gt_eq(req.query.average, req.query.x, req.query.rounding).toFixed(req.query.rounding)
        }
))

/**
  * Chi Squared Distribution
  * GET Request payload: 
  *     {freedom, x}
  * Response payload: 
  *     { answer}
  */
 app.get('/Chi', (req, res) =>  res.json(
        {
        "Answer": chi.Chi(req.query.freedom, req.query.x).toFixed(req.query.rounding),
        }
))

/**
  * Geometric Distribution
  * GET Request payload: 
  *     {probability, failure}
  * Response payload: 
  *     { answer}
  */
 app.get('/Geo', (req, res) =>  res.json(
        {
        "Answer": geo.Geometric(req.query.probability, req.query.failure).toFixed(req.query.rounding),
        "Answer_lt": geo.Geometric_lt(req.query.probability, req.query.failure).toFixed(req.query.rounding),
        "Answer_lt_eq": geo.Geometric_lt_eq(req.query.probability, req.query.failure).toFixed(req.query.rounding),
        "Answer_gt": geo.Geometric_gt(req.query.probability, req.query.failure).toFixed(req.query.rounding),
        "Answer_gt_eq": geo.Geometric_gt_eq(req.query.probability, req.query.failure).toFixed(req.query.rounding)

        }
))
