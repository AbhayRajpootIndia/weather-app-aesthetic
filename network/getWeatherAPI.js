export default getWeather = async (lat, long) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=6723f9d0c5424d7293973544230409&q=${lat},${long}&days=3&aqi=yes&alerts=yes`,
    requestOptions
  ).then((res) => res.json());
};
