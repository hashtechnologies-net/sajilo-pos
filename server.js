const http = require('http');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const app = require('./app');

app.listen(PORT, (err) => {
	if (err) return console.log(err);
	console.log(`Server Running => ${PORT}...`);
});
