const API_AI_TOKEN = process.env.API_AI_TOKEN;
const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const sendTextMessage = require('./sendTextMessage');
const findWeather = require('./findWeather');

module.exports = (senderId, message) => {
	const apiaiSession = apiAiClient.textRequest(message, {
		sessionId: 'weatherchat'
	});

	apiaiSession.on('response', response => {
		const result = response.result.fulfillment.speech;
		console.log(response.result);
		if (response.result.parameters.geocity) {
			let url = `http://api.openweathermap.org/data/2.5/weather?q=${
				response.result.parameters.geocity
			}&APPID=${OPEN_WEATHER_TOKEN}`;
			findWeather(senderId, url);
		} else if (
			response.result.parameters.lon &&
			response.result.parameters.lat
		) {
			let url = `http://api.openweathermap.org/data/2.5/weather?lat=${
				response.result.parameters.lat
			}&lon=${response.result.parameters.lon}&APPID=${OPEN_WEATHER_TOKEN}`;
			console.log('URL: ', url);
			findWeather(senderId, url);
		} else {
			sendTextMessage(senderId, result);
		}
	});
	apiaiSession.on('error', error => console.log(error));
	apiaiSession.end();
};
