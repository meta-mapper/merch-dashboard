import Database from 'better-sqlite3';
//
import defaultConfig from '$src/lib/config/default';

const db = new Database(':memory:');

const run = (query, params = []) => {
	try {
		//
		return db.prepare(query).run(...params);
		//
	} catch (error) {
		//
		console.error('Database query error:', error);
		return null;
	}
};

const get = (query, params = []) => {
	try {
		//
		return db.prepare(query).get(...params);
		//
	} catch (error) {
		//
		console.error('Database query error:', error);
		return null;
	}
};

const all = (query, params = []) => {
	try {
		//
		return db.prepare(query).all(...params);
		//
	} catch (error) {
		//
		console.error('Database query error:', error);
		return [];
	}
};

// Init database
run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL DEFAULT 'user',
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL UNIQUE,
        password TEXT NOT NULL,
        shopify_api_key TEXT,
        shopify_api_secret TEXT,
		shopify_shop TEXT,
        shopify_access_token TEXT,
		session_token TEXT
    )
`);

defaultConfig.users.forEach((user) => {
	// Insert each user into the database
	run(
		`INSERT OR IGNORE INTO users 
            (type, name, email, password, shopify_api_key, shopify_api_secret, shopify_shop, shopify_access_token)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
        `,
		[
			user.type,
			user.name,
			user.email,
			user.password,
			user.shopify_api_key || null,
			user.shopify_api_secret || null,
			user.shopify_shop || null,
			user.shopify_access_token || null
		]
	);
});

export default { db, run, get, all };
