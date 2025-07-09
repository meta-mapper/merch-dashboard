import db from '$lib/js/db.js';

export default async (token) => {
	//
	const sessionResult = db.get('SELECT * FROM users WHERE session_token = ? LIMIT 1', [token]);

	return sessionResult || null;
};
