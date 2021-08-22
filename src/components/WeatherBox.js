import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import useWeatherIcon from '../utils/useWeatherIcon';

export default function WeatherBox({title, subheader, temp, iconValue}) {

    const uWeatherIcon = useWeatherIcon();

    return (
        <Card>
            <CardHeader
                title={title}
                subheader={subheader}
            />
            <CardContent>
                <img src={uWeatherIcon.getWeatherIconLink(iconValue)} alt=""/>
                <Typography variant="body2" color="textSecondary" component="p">{temp}</Typography>
            </CardContent>
        </Card>
    );
}