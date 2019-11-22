const express = require('express');
// const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

//accept json input
app.use(express.json());
// app.use(cors());

// define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Serbver started on port ${PORT}`));
