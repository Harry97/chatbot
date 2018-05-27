const request = require('request');
const sendTextMessage = require('./sendTextMessage');
const Weather = require('../models/weather');

module.exports = (userId, city, apiKey) => {
	request(
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
		function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var weatherObj = JSON.parse(body);
				if (weatherbj.Response === 'True') {
					var query = { user_id: userId };
					var update = {
						user_id: userId,
						cord: weatherObj.cord,
						weather: weatherObj.weather,
						base: weatherObj.base,
						main: weatherObj.main,
						visibility: weatherObj.visibility,
						wind: weatherObj.wind,
						clouds: weatherObj.clouds,
						dt: weatherObj.dt,
						sys: weatherObj.sys,
						id: weatherObj.id,
						name: weatherObj.name,
						code: weatherObj.code
					};
					var options = { upsert: true };
					Weather.findOneAndUpdate(query, update, options, function(err, mov) {
						if (err) {
							console.log('Database error: ' + err);
						} else {
							message = {
								attachment: {
									type: 'template',
									payload: {
										template_type: 'generic',
										elements: [
											{
												title: weatherObj.Title,
												subtitle: 'Is this the city you are looking for?',
												image_url:
													weatherObj.Poster === 'N/A'
														? 'http://placehold.it/350x150'
														: weatherObj.Poster,
												buttons: [
													{
														type: 'postback',
														title: 'Yes',
														payload: 'Correct'
													},
													{
														type: 'postback',
														title: 'No',
														payload: 'Incorrect'
													}
												]
											}
										]
									}
								}
							};
							sendTextMessage(userId, message);
						}
					});
				} else {
					console.log(weatherObj.Error);
					sendTextMessage(userId, { text: weatherObj.Error });
				}
			} else {
				sendTextMessage(userId, { text: 'Something went wrong. Try again.' });
			}
		}
	);
};
