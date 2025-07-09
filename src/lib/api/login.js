import db from '$lib/js/db.js';

export default async ({ email, password }) => {
	//
	const loginResult = db.get(
		'SELECT id, type, name, email FROM users WHERE email = ? AND password = ? LIMIT 1',
		[email, password]
	);

	if (loginResult) {
		//
		loginResult.session_token = crypto.randomUUID();

		db.run('UPDATE users SET session_token = ? WHERE id = ? LIMIT 1', [
			loginResult.session_token,
			loginResult.id
		]);

		return loginResult;
	}

	return null;
};
