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
        arr = arr.filter(Number);

        arr.sort(function(a,b) { return a-b });
        return arr 
    },
    /**
     *  Calculates the range in the input_data 
     *  Range = Maximum Value - Minimum Value 
     */     
    range: function(input_data){
        console.log(input_data);
        //converting input string to array using , delimiter 
        var values = module.exports.csvToArray(input_data)

        console.log("Calculating range in the data:" + String(values))
        
        values = module.exports.cleanAndSort(values)

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