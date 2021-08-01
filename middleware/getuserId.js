const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

function getUserId(headers) {
	let token;

	if (headers.authorization && headers.authorization.startsWith('Bearer')) {
		// Set token from Bearer token in header
		token = headers.authorization.split(' ')[1];
	}

	// Make sure token exists
	if (!token) {
		return next(
			new ErrorResponse('Not authorized to access this route', 401)
		);
	}
	// Verify token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded.id;
}

module.exports = getUserId;
