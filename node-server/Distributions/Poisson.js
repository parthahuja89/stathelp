/**
 * File: Poisson.js
 * Calculates Poisson Distribution probabilities
 * Methods: Cumulative and Equal probability methods {(PX=x), P(X<x), P(X>x), etc..}
 */

const mathjs = require('mathjs')

module.exports = {
    /**
     * Calculates P(X=x) Equal Poisson Probability
     * Arguements:
     * average : mean of the data
     * x : random variable x
     * Method: P(x; μ) = (e^-μ) (μ^x) / x!
     */

    Poisson: function(average, x, rounding){
        console.log("Calculating Poisson Dist")
        console.log("rounding" + rounding)

        return parseFloat((mathjs.pow(average, x))*(mathjs.exp(-average))/mathjs.factorial(x))
    },

    /** 
     * Calculates the cumulative Poisson Distribution of X<x
     * Method: P(X =i) -->  0<=i<x 
     * 
     * 
    */

   Poisson_lt: function(average, x, rounding){
        x -=1 
        prob = 0

        while(x>=0){
            prob += module.exports.Poisson(average, x, rounding)
            x -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative Poisson Distribution of X=<x
     * Method: P(x=i) ---> 0<=i<=x
     */
    Poisson_lt_eq: function(average, x, rounding){
        prob = 0

        while(x>=0){
            prob += module.exports.Poisson(average, x, rounding)
            x -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative v Distribution of X>x
     * Method: 1- P(X<=x)(lt_eq)
     */
    Poisson_gt: function(average, x, rounding){
        return parseFloat(1-module.exports.Poisson_lt_eq(average, x, rounding))
    },

    /**
     * Calculates the cumulative Hypergeometric Distribution of X>=x
     * Method: 1- P(X<x)(lt)
     */
    Poisson_gt_eq: function(average, x, rounding){
        return parseFloat(1-module.exports.Poisson_lt(average, x, rounding))
    }

}