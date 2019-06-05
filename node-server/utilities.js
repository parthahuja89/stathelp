module.exports = {

    /**
     * Converts a JSON Response into array 
     * Input: Comma Seperated JSON {values: }
     * Return: Array with values
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
     *  Calculates the range in the input_data 
     *  Range = Maximum Value - Minimum Value 
     */     
    range: function(input_data){
        console.log(input_data);
        //converting input string to array using , delimiter 
        var values = module.exports.csvToArray(input_data)

        return "RANGEEEE"
    },

};