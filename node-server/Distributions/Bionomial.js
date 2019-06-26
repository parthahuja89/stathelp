/**
 * File: Bionomial.js 
 * Calculates Bionomial Distribution probabilities
 * Methods: Cumulative and Equal probability methods {(PX=x), P(X<x), P(X>x), etc..}
 */
module.exports = {
    /**
     * Rounds int to 7 decimal places
     */
    round: function(num){
        return parseFloat(num).toFixed(7)
    },
    /**
     * Calculataes factorial of num
     * Method: Simple recursion function
     */
    factorial: function(number){
        let result = 1;

        for (let i = 2; i <= number; i++) {
          result = result * i;
        }
      
        return result;
    },
    /**
     * Calculates X=x Bionomial Probability
     * Arguements: sucess: probability of success
     * trial_count : n 
     * x: number of success
     * Method: P(X) = n!/(n-x)!x! p^x(1-p)^n-x
     */
    bionomial: function(success, trial_count, x){
        const { math } = require('mathjs')

        console.log("Calculating p(X=x)!")

        success = parseFloat(success)
        trial_count = parseInt(trial_count)
        x = parseFloat(x)
        
        console.log("Sucess: " + success)
        console.log("Trial Count: " + trial_count)
        console.log("X: " + x)

        const n_factorial = module.exports.factorial(trial_count)
        const n_x_factorial = module.exports.factorial(trial_count- x)
        const x_factorial = module.exports.factorial(x)

        console.log("n! : " + String(n_factorial))
        console.log("n-x! : " + String(n_x_factorial))
        console.log("x! :" +String(x_factorial))

        probability = (n_factorial/(n_x_factorial*x_factorial)*Math.pow(success,x)*Math.pow(1-success,trial_count-x))

        probability = parseFloat(probability)

        return probability  
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