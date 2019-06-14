module.exports = {

    /**
     * Converts a JSON Request into array 
     * Input: Comma Seperated JSON {values: csv}
     * Return: Array with values separated
     */
    csvToArray: function(csv){
        //remove spaces from the string 
        console.log("JSON Check: " + JSON.stringify(csv))
        console.log("Converting following csv: " + String(csv))
        csv = csv.replace(/\s/g, '');
        console.log("String after replacing spaces: " + String(csv))

        //Converts string into array 
        var values = csv.split(",");
        return values
    },
    /**
     * Cleans the array from any non-number values due to user error 
     * After clean up, sorts the values in the array
     */
    cleanAndSort: function(arr){
        //removing any empty values
        arr = arr.filter(function(val) {
            return val != ''; 
          }); 
        
        arr.sort(function(a,b) { return a-b });
        return arr 
    },
    /**
     * Calculates the arithmetic mean in input_data
     * Method: Mean = Sum/Number of values 
     */
    mean: function(input_data){
        console.log(input_data);

        //converting and sorting 
        var values = module.exports.csvToArray(input_data)
        values = module.exports.cleanAndSort(values)
        var n = values.length
        var sum = values.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        console.log("Calculating mean sum: " + String(sum) + " N:" + String(n) )
        return String(sum/n)
    },
    /**
     * Calculates GeoMetric mean 
     * Method: Geometric mean for {1,2,3,4,5,6}  = {1x2x3x4x5x6}^1/6
     */
    geoMean: function(input_data){
        
        //conversion and sorting
        var values = module.exports.csvToArray(input_data)
        values = module.exports.cleanAndSort(values)
        
        console.log(values)

        var n = values.length
        var product = values.reduce((a, b) => a*b)

        console.log("Calculating geometric mean, product: " + String(product) + " N:" + String(n) )

        return Math.pow(product, 1/n)

    },
    /**
     * Calculates harmonic mean
     * Method: harmonic mean for {a1, a2, a3} = 4/(1/a1+1/a2+1/a3)
     */
    harmMean(input_data){
        //conversion and sorting
        var values = module.exports.csvToArray(input_data)
        values = module.exports.cleanAndSort(values)

        console.log(values)

        var n = values.length
        var denominator = 0

        for(i in values){      
            denominator += 1.0/values[i]
        }
        
        console.log("Calculating Harmonic Mean, denominator: " + String(denominator) + " N:" + String(n))
        return n/denominator 
    },
    /**
     *  Calculates the range in the input_data 
     *  Method: Range = Maximum Value - Minimum Value 
     */     
    range: function(input_data){
        console.log(input_data);
        //converting input string to array using , delimiter 
        var values = module.exports.csvToArray(input_data)
        values = module.exports.cleanAndSort(values)

        console.log("Parsed: " + String(values))
        console.log("Calculating range in the data:" + String(values))
        range = values[values.length-1]-values[0]
        
        return range
    },
    /**
     * Calculates mode i.e highest frequency value in input_data
     * Method: Make a dictionary of frequencies and return the highest frequency element 
     */
    mode: function(input_data){
        console.log(input_data);
        //convert request json -> array
        var values = module.exports.csvToArray(input_data)

        console.log("Calculating mode in the data:" + String(values))
        
        values = module.exports.cleanAndSort(values)
        
        //dictionary holds the frequency of each number in the values array 
        var mode_dict = {} 
        for(var val in values){
            val = values[val]
            console.log(val)
            if(mode_dict.hasOwnProperty(val)){
                mode_dict[val]  += 1
            }
            else{
                mode_dict[val] = 1 
            }
        }

        console.log("Dictionary of user input: " + JSON.stringify(mode_dict))

        highest = 0
        frequency = -Infinity
        for(var key in mode_dict){
            if(mode_dict[key] > frequency){
                highest = key
                frequency = mode_dict[key]
            }
        }

        return highest 
    },

};