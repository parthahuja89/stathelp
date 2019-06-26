/**
 * File: Normal.js
 * Calculates Normal Distribution probabilities
 * Methods: Cumulative and Equal probability methods {(PX=x), P(X<x), P(X>x), etc..}
 */
const mathjs = require('mathjs')

module.exports = {
    /**
     * Calculates P(Z<=z) Cumulative Normal Probability
     * Arguements: 
     * z_score: Z value
     * mean : mean of the data
     * standard_dev: standard deviation of the data
     * Method: Calculting using mathjs.erf
     */
    normal: function(z_score, mean, standard_dev){
        return (1 - mathjs.erf((mean - z_score ) / (Math.sqrt(2) * standard_dev))) / 2
    },
};