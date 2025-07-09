import db from '$lib/js/db.js';

export default async (session) => {
	//
	if (session?.type !== 'admin') {
		return [];
	}

	const users = await db.all('SELECT * FROM users');

	return users.map((user) => ({
		//
		id: user.id,
		type: user.type,
		name: user.name,
		email: user.email
	}));
};
