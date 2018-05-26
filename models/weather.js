const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var WeatherSchema = new Schema(
	{
		user_id: { type: String },
		coord: { lon: { type: Number }, lat: { type: Number } },
		weather: [
			{
				id: { type: String },
				main: { type: String },
				description: { type: String },
				icon: { type: String }
			}
		],
		base: { type: String },
		main: {
			temp: { type: Number },
			pressure: { type: Number },
			humidity: { type: Number },
			temp_min: { type: Number },
			temp_max: { type: Number }
		},
		visibility: { type: Number },
		wind: { speed: { type: Number }, deg: { type: Number } },
		clouds: { all: { type: Number } },
		dt: { type: Number },
		sys: { type: Number },
		id: { type: Number },
		message: { type: Number },
		country: { type: String },
		sunrise: { type: Date },
		sunset: { type: Date }
	},
	(id: { type: Number }),
	(name: { type: String }),
	(cod: { type: Number })
);

module.exports = mongoose.model('Weather', WeatherSchema);
