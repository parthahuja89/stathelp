/**
 * File: Geometric.js
 * Calculates Geometric Distribution probabilities
 * Methods: Two Cumulative methods P(X<=x) and P(X>=x)
 */

const mathjs = require('mathjs')

module.exports = {
    /**
     * Calculates P(X<=x) Cumulative Geoemetric Probability
     * Arguements: 
     * Probability: prob of success
     * Failure: total number of trials -1 --> failures 
     * Method: P(X=x) = P(1-P)^(failure)
     */
    Geometric: function(probability, failure){
        return parseFloat(mathjs.bignumber((probability)*mathjs.pow(1-probability, failure-1)))
    },

    /** 
     * Calculates the cumulative Geoemetricc Distribution of X<x
     * Method: P(X =i) -->  0<=i<x 
     * 
     * 
    */

   Geometric_lt: function(probability, failure){
        failure -= 1
        prob = 0.0

        while(failure>0){
            prob += module.exports.Geometric(probability, failure) 
            failure -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative Geoemetric Distribution of X=<x
     * Method: P(x=i) ---> 0<=i<=x
     */
    Geometric_lt_eq: function(probability, failure){
        prob = 0.0

        while(failure>0){
            prob += module.exports.Geometric(probability, failure)
            failure -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative Geoemetric Distribution of X>x
     * Method: 1- P(X<=x)(lt_eq)
     */
    Geometric_gt: function(probability, failure){
        return parseFloat(1-module.exports.Geometric_lt_eq(probability, failure))
    },

    /**
     * Calculates the cumulative Geoemetric Distribution of X>=x
     * Method: 1- P(X<x)(lt)
     */
    Geometric_gt_eq: function(probability, failure){
        return parseFloat(1-module.exports.Geometric_lt(probability, failure))
    }
};