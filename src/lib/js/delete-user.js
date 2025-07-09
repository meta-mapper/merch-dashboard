import db from '$lib/js/db.js';

export default async ({ session, id }) => {
	//
	if (session?.type !== 'admin' || id == 1) {
		return null;
	}

	return db.run(
		//
		`DELETE FROM users WHERE id = ?`,
		[id]
	);
};
