const request = require("request");

const forecast = (location = "Bangalore", callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=7e6f40880f164d2ca9a121249231904&q=${location}&days=1&aqi=no&alerts=no`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Go to hell");
    } else {
      const { current, forecast, location } = response.body;
      callback(undefined, {
        forecast: `${current?.condition.text}. It is currently ${current?.temp_c} degrees out. Forecast: ${forecast?.forecastday[0].day.condition.text}`,
        location: `${location.name}, ${location.region}, ${location.country}`,
      });
    }
  });
};

module.exports = {
  forecast,
};
