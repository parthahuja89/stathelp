import React from 'react';
import './Landing.css';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from 'react-reveal/Fade';
import IconButton from '@material-ui/core/IconButton';
import Arrow from '@material-ui/icons/ArrowDownward';
//MUI Styles
const styles = {
    button: {
        textTransform: 'none',
        borderRadius: 15,        
        boxShadow: 'none',
    },
}
const theme = createMuiTheme({
    palette: {
        primary:{
            main: '#5E3656'

        },
        secondary: {
            main: '#9148BC'
        }
      },
      
    typography: {
    // Use the system font.
    fontFamily:
        'Overpass',
    },
});



class Landing extends React.Component{
    render(){
        const { classes } = this.props;
        return(
        <MuiThemeProvider theme={theme}>

        <div class='Landing_Page'>
            {/** Logo and Text */}
            <div style = {{marginLeft: '2%', marginTop: '0.5%'}}>
            <svg width="61" height="41" viewBox="0 0 61 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class='path_1' d="M61 5.82872C61 2.60961 58.3137 -2.33598e-06 55 -2.33598e-06C51.6863 -2.33598e-06 49 2.60961 49 5.82872V35.1713C49 38.3904 51.6863 41 55 41C58.3137 41 61 38.3904 61 35.1713V5.82872Z" fill="#A85FBC"/>
                <path class='path_2' d="M45 16.7757C45 13.5859 42.3137 11 39 11C35.6863 11 33 13.5859 33 16.7757V35.2243C33 38.4141 35.6863 41 39 41C42.3137 41 45 38.4141 45 35.2243V16.7757Z" fill="#BC73BC"/>
                <path class='path_3' d="M28 26.1018C28 22.7319 25.3137 20 22 20C18.6863 20 16 22.7319 16 26.1018V34.8982C16 38.2681 18.6863 41 22 41C25.3137 41 28 38.2681 28 34.8982V26.1018Z" fill="#D48BBC"/>
                <path class='path_4' d="M11.898 31.643C11.898 28.3574 9.23454 25.694 5.949 25.694C2.66346 25.694 0 28.3574 0 31.643V34.948C0 38.2335 2.66346 40.897 5.949 40.897C9.23454 40.897 11.898 38.2335 11.898 34.948V31.643Z" fill="#E79EBC"/>
            </svg>
            <div id='logo'> 
                StatHelp
            </div>
            </div>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
            <Grid items m = {2} l = {2} >
            <div class='Title'>
            <Fade>
                A Minimalistic Statistics Calculator and Analyzer.
            </Fade>
            </div>        
            <div class='sub_text'>
            <Fade>
                A utility tool that includes tendency calculations, probability distribution, 
                data visual analysis with graphs, and data testing. 
            
            </Fade>
            </div>
            </Grid>
            </Grid>

            {/** Buttons grid */}
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                padding={20}
                style= {{marginTop: '2.5%'}}
            >       
            <Grid item  md={1}  align='center' spacing= {2}>
                <Button 
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            style={{justifyConstent: 'center'}}
                            size="medium"
                            onClick={() =>  this.props.history.push('/web')}
                >
                            Web
                </Button>
            </Grid>   
            <Grid item  md={10} spacing= {2} >
                <Button  
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            style={{justifyConstent: 'center'}}
                            size="medium"
                >
                            Android
                </Button> 
            </Grid>
            </Grid>

        </div>
        
        {/** Section 2 */}
        <div class=' Landing_Page_2'>
        <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
            <Grid items m = {2} l = {2} >
            <div class='Title'>
            <Fade>
                Statistics Concepts, Simplified.
            </Fade>
            </div>        
            <div class='sub_text'>
            <Fade>
            Get answers to common calculations like Mean, Median, Mode, Variance, Standard Deviations and many more. 
            </Fade>
            </div>
            </Grid>
        </Grid>
        </div>

        {/** Section 3 */}
        <div class=' Landing_Page_3'>
        <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
            <Grid items m = {2} l = {2} >
            <div class='Title'>
            <Fade>
                Plot your data.
            </Fade>
            </div>        
            <div class='sub_text' style ={{width: '60%'}}>
            <Fade>
            Easily plot graphs like box plots, bar graph, and pie chart. 
            
            </Fade>
            </div>
            </Grid>
        </Grid>
        </div>

        </MuiThemeProvider>
        );
    }
    
}

export default withStyles(styles)(Landing)