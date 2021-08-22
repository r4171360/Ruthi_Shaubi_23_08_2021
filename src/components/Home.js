import React, { useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import CitySearch from './CitySearch';
import { AppContext } from '../context';
import _ from 'lodash';
import WeatherBox from './WeatherBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 16
    }
}));

export default function Home({location}) {

    const classes = useStyles();
    const context = useContext(AppContext);

    useEffect(() => {
        if (location)
            context.updateCityOptionKey(location)
    }, [location]);

    let title = "";
    if(context.cityOptions && context.cityOptions.length)
        title = `${_.get(context.cityOptions, "[0].LocalizedName")}, ${_.get(context.cityOptions, "[0].Country.LocalizedName")}`;
    
    return (
        <React.Fragment>
            <Grid container justifyContent="center">
                <CitySearch />
            </Grid>

            <Card className={classes.card}>
                <CardHeader
                    title={title}
                    subheader={_.get(context, 'forecastsData.Headline.Text', "")}
                    subheaderTypographyProps={{variant: "h6"}}
                    action={context.favoraites[context.cityOptionKey] ? (
                        <Tooltip title="Remove from favoraites">
                            <IconButton onClick={context.removeFromFevoraites}>
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Add to favoraites">
                            <IconButton onClick={context.addToFavoraites}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                />
                <CardContent>
                    <Grid container spacing={2} justifyContent="center">
                        {_.get(context, 'forecastsData.DailyForecasts[0]') && context.forecastsData.DailyForecasts.map(item => (
                            <Grid item xs={4} lg={2}>
                                <WeatherBox
                                    title={new Date(item.Date).toLocaleString('en-us', { weekday: 'short' })}
                                    iconValue={item.Day.Icon}
                                    temp={`${item.Temperature.Minimum.Value}${item.Temperature.Minimum.Unit} - ${item.Temperature.Maximum.Value}${item.Temperature.Maximum.Unit}`}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}