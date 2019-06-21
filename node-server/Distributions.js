module.exports = {
    
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
     * Calculates the Bionomial Distribution probabilities 
     * Arguements: sucess: probability of success
     * trial_count : n 
     * x: number of success
     * Method: P(X) = n!/(n-x)!x! p^x(1-p)^n-x
     */
    bionomial: function(success, trial_count, x){
        const { math } = require('mathjs')

        console.log("Calculating Bionomial Distribution!")

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
        
        if(isNaN(probability)){
            return  '  <0.000001'
        }
        return probability
    },
};