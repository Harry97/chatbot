const API_AI_TOKEN = process.env.API_AI_TOKEN;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');
const sendTextMessage = require('./sendTextMessage');

module.exports = event => {
	if (!event.message.is_echo) {
		console.log("Received message from senderId: " + senderId);
		console.log("Message is: " + JSON.stringify(message));
		
		const senderId = event.sender.id;
		const message = event.message.text;

		const apiaiSession = apiAiClient.textRequest(message, {
			sessionId: 'crowdbotics_bot'
		});
		apiaiSession.on('response', response => {
			const result = response.result.fulfillment.speech;
			sendTextMessage(senderId, result);
		});
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
	}
};
