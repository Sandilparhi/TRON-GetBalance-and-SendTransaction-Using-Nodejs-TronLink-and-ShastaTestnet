const express = require('express');
const app = express();
require('dotenv').config();
require('./config/database').connect() 
const { PORT } = process.env;
const port = process.env.PORT || PORT;

const balanceRoute = require('./api/routes/balances')
const transactionRoute = require('./api/routes/transaction')

app.use(express.json());

app.use('/api', balanceRoute);
app.use('/api', transactionRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


