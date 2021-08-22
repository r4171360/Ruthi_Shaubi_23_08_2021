
import _, { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { AppContext } from '.';
import weatherConfig from '../utils/weatherConfig';

export default function WeatherContext({ children }) {
    const [city, setCity] = useState("Tel Aviv");
    const [fullCityName, setFullCityName] = useState("Tel Aviv");
    const [cityOptions, setCityOptions] = useState([{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }])
    const [forecastsData, setForecastsData] = useState({ DailyForecasts: [], Headline: {} })
    const [cityOptionKey, setCityOptionKey] = useState(null);
    const [favoraites, setFavoraites] = useState({});
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("home");

    const handleCityChange = (newCity) => {
        if (newCity !== city)
            setCity(newCity);
    }

    const getRequest = (url) => {
        url += `?apikey=${weatherConfig.API_KEY}&q=${city}&metric=true`;
        let result = fetch(url)
            .then(response => { return response.text() })
            .then(result => {
                let res = JSON.parse(result);
                return res;
            }).catch(error => {
                setErrorSnackbar(error.message);
                return false;
            })
        return result;
    }

    const getAutoCompleteOptions = async () => {
        const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
        let res = await getRequest(url);
        if (res)
            setCityOptions(res);
    }

    const get5DaysOfForecasts = async () => {
        const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityOptionKey}`;
        let res = await getRequest(url);
        if (res)
            setForecastsData(res);
    }
    const getCurrentConditions = async () => {
        const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityOptionKey}`;
        let res = await getRequest(url);
        if (res)
            return res;
    }
    const getGeoPosition =  (latitude, longitude) => {
        const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${cityOptionKey}&q=${latitude}%2C${longitude}"`;
        
        let result = fetch(url)
            .then(response => { return response.text() })
            .then(result => {
                let res = JSON.parse(result);
                return res;
            })
        return result;

    }

    useEffect(() => {
        if (city)
            getAutoCompleteOptions();
    }, [city]);

    useEffect(() => {
        if (_.get(cityOptions, '[0].Key') && _.get(cityOptions, '[0].Key') !== cityOptionKey)
            setCityOptionKey(cityOptions[0].Key);
    }, [cityOptions]);

    useEffect(() => {
        if (cityOptionKey)
            get5DaysOfForecasts();
    }, [cityOptionKey]);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const {latitude, longitude} =  position.coords;
            getGeoPosition(latitude, longitude);
            });
        }
        else{
            navigator.geolocation.getCurrentPosition((position) => {
              
              getGeoPosition(32.109333, 34.855499);
              });
        }
    },[]);

    const addToFavoraites = async () => {
        let newFavoraites = cloneDeep(favoraites);
        let res = await getCurrentConditions();
        if (res) {
            newFavoraites[cityOptionKey] = res[0];
            newFavoraites[cityOptionKey]["fullLocationName"] = fullCityName;
            newFavoraites[cityOptionKey]["cityName"] = city;
            setFavoraites(newFavoraites);
        }
    }

    const removeFromFevoraites = () => {
        let newFavoraites = cloneDeep(favoraites);
        delete newFavoraites[cityOptionKey];
        setFavoraites(newFavoraites);
    }

    const updateCityOptionKey = (key) => {
        if (favoraites[key]) {
            setCity(favoraites[key].cityName);
            setFullCityName(favoraites[key].fullLocationName);
        }
        else {
            setCity("");
            setFullCityName("");
        }
        setCityOptionKey(key);
    }

    return (
        <AppContext.Provider
            value={{
                city: city,
                cityOptions: cityOptions,
                handleCityChange: handleCityChange,
                updateFullCityName: (fullName) => setFullCityName(fullName),
                forecastsData: forecastsData,
                favoraites: favoraites,
                addToFavoraites: addToFavoraites,
                removeFromFevoraites: removeFromFevoraites,
                cityOptionKey: cityOptionKey,
                updateCityOptionKey: updateCityOptionKey,
                errorSnackbar: errorSnackbar,
                setCurrentUrl: setCurrentUrl,
                currentUrl: currentUrl
            }}
        >
            {children}
        </AppContext.Provider>
    )
}