const API_AI_TOKEN = process.env.API_AI_TOKEN;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');
const sendTextMessage = require('./sendTextMessage');
const findWeather = require('./findWeather');
const getWeatherDetail = require('./getWeatherDetail');

module.exports = event => {
	if (!event.message.is_echo) {
		const senderId = event.sender.id;
		const message = event.message.text;

		console.log('Received message from senderId: ' + senderId);
		console.log('Message is: ' + JSON.stringify(message));

		if (message.text) {
			let formattedMsg = message.text.toLowerCase().trim();

			// If we receive a text message, check to see if it matches any special
			// keywords and send back the corresponding weather details.
			// Otherwise, search for weather details.
			switch (formattedMsg) {
				case 'cord':
				case 'weather':
				case 'wind':
				case 'clouds':
				case 'dt':
					getWeatherDetail(senderId, formattedMsg);
					break;

				default:
					findWeather(senderId, formattedMsg, OPEN_WEATHER_TOKEN);
			}
		} else if (message.attachments) {
			sendTextMessage(senderId, {
				text: "Sorry, I don't understand your request."
			});
		}

		// const apiaiSession = apiAiClient.textRequest(message, {
		// 	sessionId: 'crowdbotics_bot'
		// });
		// apiaiSession.on('response', response => {
		// 	const result = response.result.fulfillment.speech;
		// 	sendTextMessage(senderId, result);
		// });
		// apiaiSession.on('error', error => console.log(error));
		// apiaiSession.end();
	}
};
