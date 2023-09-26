const express = require('express');
const app = express();
require('dotenv').config()
// const { AbortController } = require('abort-controller');

const CORS = require('cors');

// const bodyParser = require('body-parser');

const codeConversionRoutes = require('./Backend/Routes/codeConversion');
const codeDebuggingRoutes = require('./Backend/Routes/codeDebugger');
const codeQualityCheckRoutes = require('./Backend/Routes/codeQualityCheck');
app.use(CORS())
app.use(express.json());

// CORS setup if needed
app.get('/', (req, res) => {
    res.send({ name: "Rushikesh Bhomale", code: 'fw25_348', app: 'Code Converter App' })
})
app.use('/api/codeConversion', codeConversionRoutes);
app.use('/api/codeDebugging', codeDebuggingRoutes);
app.use('/api/codeQualityCheck', codeQualityCheckRoutes);

// const controller = new AbortController();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
