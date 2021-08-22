import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext } from 'react';
import { AppContext } from '../context';

export default function CitySearch(){

    const context = useContext(AppContext);

    return(
        <Autocomplete
            options={context.cityOptions || []}
            getOptionLabel={(option) => `${option.LocalizedName}, ${option.Country?option.Country.LocalizedName: ""}`}
            style={{ width: 300 }}
            inputValue={context.city}
            value={context.city}
            disableClearable
            noOptionsText=""
            renderInput={(params) => (
                <TextField {...params} variant="outlined" onChange={(e)=>context.handleCityChange(e.target.value)} />
            )}
            onChange={(e, option) => { context.updateFullCityName(e.target.innerText); context.handleCityChange(option.LocalizedName) }}
      />
    )
}