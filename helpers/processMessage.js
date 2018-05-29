const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

const request = require('request');
const sendTextMessage = require('./sendTextMessage');
const getWeatherDetail = require('./getWeatherDetail');
const flowWithTheDialog = require('./flowWithTheDialog');

module.exports = event => {
	const senderId = event.sender.id;
	const message = event.message.text;
	if (!event.message.is_echo) {
		console.log('Received message from senderId: ' + senderId);
		console.log('Message is: ' + JSON.stringify(message));

		let formattedMsg = JSON.stringify(message)
			.trim()
			.toLowerCase()
			.replace(/"/g, '');

		// If we receive a text message, check to see if it matches any special
		// keywords and send back the corresponding weather details.
		// Otherwise, search for weather details.
		switch (formattedMsg) {
			case 'coord':
			case 'wind':
			case 'main':
			case 'clouds':
			case 'visibility':
			case 'dt':
				getWeatherDetail(senderId, formattedMsg);
				break;

			default:
				flowWithTheDialog(senderId, message);
		}
	} else if (!event.message.is_echo && message.attachments) {
		sendTextMessage(senderId, {
			text: "Sorry, I don't understand your request."
		});
	}
};
