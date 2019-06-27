/**
 * File: Hyper.js
 * Calculates Hypergeometric Distribution probabilities
 * Methods: Cumulative and Equal probability methods {(PX=x), P(X<x), P(X>x), etc..}
 */

const mathjs = require('mathjs')

module.exports = {
    /**
     * Calculates P(X=x) Equal Hypergeometric Probability
     * Arguements: 
     * z_score: Z value
     * mean : mean of the data
     * standard_dev: standard deviation of the data
     * Method: h(x; N, n, k) = [ kCx ] [ N-kCn-x ] / [ NCn ]
     */

    Hypergeometric: function(N,k,n,x){
        console.log("Calculating Hypergeometric Dist")
        //error check for data where n<k in mathjs.combinations(n, k) 
        if(k<x || (N-k)<(n-x) || N<n){
            console.log("Error")
            return 0
        }
        N = mathjs.bignumber(N)
        n = mathjs.bignumber(n)
        k = mathjs.bignumber(k)
        x = mathjs.bignumber(x)

        return (mathjs.combinations(k,x)*mathjs.combinations(N-k,n-x))/mathjs.combinations(N,n)
    },

    /** 
     * Calculates the cumulative Hypergeometric Distribution of X<x
     * Method: P(X =i) -->  0<=i<x 
     * 
     * 
    */

    Hypergeometric_lt: function(N,k,n,x){
        x -=1 
        prob = 0

        while(x>=0){
            prob += module.exports.Hypergeometric(N, k,n,x)
            x -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative HyperGeometric Distribution of X=<x
     * Method: P(x=i) ---> 0<=i<=x
     */
    Hypergeometric_lt_eq: function(N,k,n,x){
        prob = 0

        while(x>=0){
            prob += module.exports.Hypergeometric(N, k,n,x)
            x -= 1
        }

        return parseFloat(prob)
    },

    /**
     * Calculates the cumulative Hypergeometric Distribution of X>x
     * Method: 1- P(X<=x)(lt_eq)
     */
    Hypergeometric_gt: function(N,k,n,x){
        return parseFloat(1-module.exports.Hypergeometric_lt_eq(N,k,n,x))
    },

    /**
     * Calculates the cumulative Hypergeometric Distribution of X>=x
     * Method: 1- P(X<x)(lt)
     */
    Hypergeometric_gt_eq: function(N,k,n,x){
        return parseFloat(1-module.exports.Hypergeometric_lt(N,k,n,x))
    }


}