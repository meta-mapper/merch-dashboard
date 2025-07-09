import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

export const getShopifyClient = (session) => {
	//
	try {
		const shopify = shopifyApi({
			//
			hostName: session.shopify_shop,
			apiKey: session.shopify_api_key,
			apiSecretKey: session.shopify_api_secret,
			apiVersion: LATEST_API_VERSION,
			isEmbeddedApp: false,
			scopes: ['read_orders', 'read_products']
		});

		return new shopify.clients.Graphql({
			session: {
				shop: session.shopify_shop,
				accessToken: session.shopify_access_token
			}
		});
		//
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		//
		console.error('Error creating Shopify client');

		return null;
	}
};
