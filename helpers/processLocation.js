const findWeather = require('./findWeather');
const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;

module.exports = event => {
	let senderId = event.sender.id;
	if (event.message.attachments[0].payload.coordinates) {
		let lat = event.message.attachments[0].payload.coordinates.lat;
		let long = event.message.attachments[0].payload.coordinates.long;
		let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${OPEN_WEATHER_TOKEN}`;
		findWeather(senderId, url);
	}
};
