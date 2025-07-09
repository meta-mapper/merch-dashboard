import db from '$lib/js/db.js';

export default async ({ session, payload }) => {
	//
	if (session?.type !== 'admin') {
		return null;
	}

	if (!payload || !payload.type || !payload.name || !payload.email || !payload.password) {
		return null;
	}

	if (
		payload.type === 'user' &&
		(!payload.shopify_api_key ||
			!payload.shopify_api_secret ||
			!payload.shopify_shop ||
			!payload.shopify_access_token)
	) {
		return null;
	}

	return db.run(
		`INSERT OR IGNORE INTO users 
            (type, name, email, password, shopify_api_key, shopify_api_secret, shopify_shop, shopify_access_token)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
        `,
		[
			payload.type,
			payload.name,
			payload.email,
			payload.password,
			payload.shopify_api_key || null,
			payload.shopify_api_secret || null,
			payload.shopify_shop || null,
			payload.shopify_access_token || null
		]
	);
};
