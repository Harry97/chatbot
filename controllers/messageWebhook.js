// All callbacks for Messenger will be POST-ed here
const processMessage = require('../helpers/processMessage');
const processPostback = require('../helpers/processPostback');
const processLocation = require('../helpers/processLocation');

module.exports = (req, res) => {
	// Make sure this is a page subscription
	if (req.body.object == 'page') {
		// Iterate over each entry
		// There may be multiple entries if batched
		req.body.entry.forEach(entry => {
			if (entry.messaging) {
				// Iterate over each messaging event
				entry.messaging.forEach(event => {
					if (event.postback) {
						processPostback(event);
					} else if (event.message && event.message.attachments) {
						processLocation(event);
					} else if (event.message) {
						processMessage(event);
					}
				});
			}
		});
		res.status(200).end();
	}
};
