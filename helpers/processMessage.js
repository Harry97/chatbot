const API_AI_TOKEN = process.env.API_AI_TOKEN;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text }
		}
	});
};
module.exports = event => {
	const senderId = event.sender.id;
	const message = event.message.text;
	const payload = event.postback.payload;

	if (payload === 'Greeting') {
		// Get user's first name from the User Profile API
		// and include it in the greeting
		request(
			{
				url: 'https://graph.facebook.com/v2.6/' + senderId,
				qs: {
					access_token: process.env.PAGE_ACCESS_TOKEN,
					fields: 'first_name'
				},
				method: 'GET'
			},
			function(error, response, body) {
				var greeting = '';
				if (error) {
					console.log("Error getting user's name: " + error);
				} else {
					var bodyObj = JSON.parse(body);
					name = bodyObj.first_name;
					greeting = 'Hi ' + name + '. ';
				}
				var message =
					greeting +
					'My name is Weather Bot. I can tell you current weather status in any city. What city would you like to know about?';
				sendTextMessage(senderId, { text: message });
			}
		);
	} else {
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
