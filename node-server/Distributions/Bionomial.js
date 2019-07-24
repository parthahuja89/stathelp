/**
 * File: Bionomial.js 
 * Calculates Bionomial Distribution probabilities
 * Methods: Cumulative and Equal probability methods {(PX=x), P(X<x), P(X>x), etc..}
 */
const mathjs = require('mathjs')
module.exports = {
    /**
     * Calculates X=x Bionomial Probability
     * Arguements: sucess: probability of success
     * trial_count : n 
     * x: number of success
     * Method: P(X) = Trial_Count(C)x (p)^x(1-p)^x
     */

    /**
     * TODO: Implement bionomial dist with the direct combination formula for accuracy 
     */
    bionomial: function(success, trial_count, x){

        success = mathjs.bignumber(success)
        trial_count = mathjs.bignumber(trial_count)
        x = mathjs.bignumber(x)

        return mathjs.combinations(trial_count, x)*mathjs.pow(success, x)*mathjs.pow(1-success, trial_count-x)
 
    },

    /** 
     * Calculates the cumulative Bionomial Distribution of X<x
     * Method: P(X =i) -->  0<=i<x 
     * 
     * 
    */
    bionomial_lt: function(success, trial_count, x){
        console.log("Calculating cumulative P(X<x)")

        probability = 0.0
        x -= 1 
        while(x>=0){
            probability += module.exports.bionomial(success, trial_count, x)
            x -= 1  
        }

        console.log("P(X<x): " + String(probability))
        probability = parseFloat(probability)

        return probability  
    },

    /**
     * Calculates the cumulative Bionomial Distribution of X=<x
     * Method: P(x=i) ---> 0<=i<=x
     */
    bionomial_lt_eq: function(success, trial_count, x){
        console.log("Calculating cumulative P(X<=x)")

        probability = 0.0

        while(x>=0){
            probability += module.exports.bionomial(success, trial_count, x)
            x -= 1  
        }

        console.log("P(X<=x): " + String(probability))
        probability = parseFloat(probability)

        return probability  

    },
    /**
     * Calculates the cumulative Bionomial Distribution of X>x
     * Method: 1- P(X<=x)(lt_eq)
     */
    bionomial_gt: function(success, trial_count, x){
        console.log("Calculating cumulative P(X>x)")

        probability = module.exports.bionomial_lt_eq(success, trial_count, x)
        probability = 1 - probability
        
        console.log("P(X>x): " + String(probability))

        probability = parseFloat(probability)

        return probability  
    },
    /**
     * Calculates Bionomial Distribution of X>=x
     * Method: 1 - P(X<x)(lt)
     */
    bionomial_gt_eq: function(success, trial_count, x){
        console.log("Calculating cumulative P(X>=x)")
        
        probability = module.exports.bionomial_lt(success, trial_count, x)
        probability = 1 - probability
        
        console.log("P(X>=x): " + String(probability))

        probability = parseFloat(probability)

        return probability      

    }
};