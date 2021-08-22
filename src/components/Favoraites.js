import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { AppContext } from '../context';
import WeatherBox from './WeatherBox';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 36
    }
}));

export default function Favoraites() {

    const classes = useStyles();
    const context = useContext(AppContext);

    return (
        <Grid container spacing={2} justifyContent="center" className={classes.root}>
            {Object.keys(context.favoraites).map(item=>{
                let forecast = context.favoraites[item];
                return(
                    <Grid item md={3}>
                        <div onClick={()=>context.setCurrentUrl(item)}>
                            <WeatherBox 
                                title={forecast.fullLocationName} 
                                subheader={forecast.WeatherText}
                                temp={`${forecast.Temperature.Metric.Value}${forecast.Temperature.Metric.Unit}`}
                                iconValue={forecast.WeatherIcon}
                            />
                        </div>
                    </Grid>
                )}
            )}
        </Grid>
    );
}