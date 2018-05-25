const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000);

const homeController = require('./controllers/home');
const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');

app.get('/', homeController);
app.get('/webhook', verificationController);
app.post('/webhook', messageWebhookController);
