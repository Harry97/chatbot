const Weather = require('../models/weather');
const sendTextMessage = require('./sendTextMessage');

function formatResponse(text) {
	let response = '';
	Object.keys(text.toJSON()).forEach((key, index) => {
		response += `${key}: ${text[key]}, `;
	});
	// Remove the last two characters
	return response.slice(0, -2);
}

module.exports = (userId, field) => {
	Weather.findOne({ user_id: userId }, function(err, weather) {
		if (err) {
			sendTextMessage(userId, { text: 'Something went wrong. Try again' });
		} else {
			sendTextMessage(userId, { text: formatResponse(weather[field]) });
		}
	});
};
