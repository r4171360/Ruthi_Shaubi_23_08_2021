import weatherConfig from './weatherConfig';

export default function useWeatherIcon(){

    const getWeatherIconLink = (value) =>{
        if (value < 10) {
            value = `0${value}`;
        }
        return `${weatherConfig.IMG_URL}/${value}-s.png`;
    }

    return {
        getWeatherIconLink: getWeatherIconLink,
    }
}