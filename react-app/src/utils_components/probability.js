import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    textfield:{
    },
}; 


class Probability extends React.Component{
    render(){
        return(
            <div>
                Prob page
            </div>
        );
    }
}

Probability.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Probability);