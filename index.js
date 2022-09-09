const express = require('express');
const path = require('path');

const app = express();
const port = 5173;

app.use(express.static(path.join(__dirname, '/./dist')));
app.listen(port, () => {console.log('listening on port: ', port)});