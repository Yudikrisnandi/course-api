const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/board', require('./routes/board'));
app.use('/api/v1/list/:boardId', require('./routes/list'));
app.use('/api/v1/card/:boardId', require('./routes/card'));

app.listen(5000)
