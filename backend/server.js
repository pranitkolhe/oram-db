const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const logRoutes = require('./routes/logRoutes');
const dataRoutes = require('./routes/dataRoutes');
const path = require('path');

// serve frontend



const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json());
app.use('/api', dataRoutes);
app.use('/api/logs', logRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});