const request = require('request');
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

module.exports = (senderId, text) => {
	console.log('SENDER ID: ', senderId);
	console.log('TEXT: ', text);

	request(
		{
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: FACEBOOK_ACCESS_TOKEN },
			method: 'POST',
			json: {
				recipient: { id: senderId },
				message: text
			}
		},
		function(error, response, body) {
			if (error) {
				console.log('ERORR: ', error);
			} else {
				console.log('SENT SUCCESSFULLY', response.body);
			}
		}
	);
};
