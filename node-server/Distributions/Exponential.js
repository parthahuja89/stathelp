/**
 * File: Exponential.js
 * Calculates Exponential Distribution probabilities
 * Methods: Two Cumulative methods P(Z<=z) and P(Z>=z)
 */
const mathjs = require('mathjs')

module.exports = {
    /**
     * Calculates P(Z<=z) Cumulative Normal Probability
     * Arguements: 
     * x: random variable
     * Beta: 1/lambda
     * Method: P(X<=x): 1-e^(-x/beta)
     */
    Exponential: function(x, beta){
        return parseFloat(1 - mathjs.exp(-x/beta))
    },
};
