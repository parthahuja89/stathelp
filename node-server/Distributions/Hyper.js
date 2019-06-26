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
        return (mathjs.combinations(k,x)*mathjs.combinations(N-k,n-x))/mathjs.combinations(N,n)
    }
};