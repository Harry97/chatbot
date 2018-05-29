const request = require('request');
const sendTextMessage = require('./sendTextMessage');
const Weather = require('../models/weather');

module.exports = (userId, url) => {
	request(url, function(error, response, body) {
		console.log('Body: ', body);
		if (!error && response.statusCode === 200) {
			var weatherObj = JSON.parse(body);
			var query = { user_id: userId };
			var update = {
				user_id: userId,
				coord: weatherObj.coord,
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
			const options = { upsert: true };
			Weather.findOneAndUpdate(query, update, options, function(err, weather) {
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
										title: weatherObj.name,
										subtitle: `It's ${weatherObj.main.temp -
											273.15} celsius right now. Would you like to request more information?`,
										image_url: `http://openweathermap.org/img/w/${
											weatherObj.weather[0].icon
										}.png`,
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
			sendTextMessage(userId, { text: 'Something went wrong. Try again.' });
		}
	});
};
