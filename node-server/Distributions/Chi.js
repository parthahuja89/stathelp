/**
 * File: Chi.js
 * Calculates Chi Distribution probabilities
 * Methods: Two Cumulative methods P(X<=x) and P(X>=x)
 */

const mathjs = require('mathjs')
const incomplete = require('incomplete-gamma');

module.exports = {
     /**
     * Calculates P(X<=x) Cumulative Normal Probability
     * Arguements: 
     * freedom (v): degrees of freedom
     * x: random variable x
     * Method: P(X<=x) = LOWER_INCOMPLETE_GAMMA(v/2,x/2)/GAMMA(v/2)
     */
    Chi: function(v, x){
        console.log("Chi squared /n Degrees of freedom: " + String(v) )
        console.log("X: " + String(x))
        
        return incomplete.lower(v/2, x/2)/mathjs.gamma(v/2)
    },
};
