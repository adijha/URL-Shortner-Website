const express = require('express');

const cron = require('node-cron');

const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

//accept json input
app.use(express.json());

cron.schedule('40-50 25 * * * *', function() {
	console.log('running a task every minute');
});

// define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Serbver started on port ${PORT}`));
