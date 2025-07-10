import { getShopifyClient } from '$lib/js/shopify';

const gql = (x) => x[0];

export default async ({ session, after = null }) => {
	//
	try {
		const shopifyClient = getShopifyClient(session);

		const response = await shopifyClient.request(
			gql`
				query GetProducts($after: String) {
					#
					products(first: 10, after: $after, sortKey: ID, reverse: false) {
						edges {
							node {
								id
								title
								handle
								status
								images(first: 1) {
									edges {
										node {
											url
											altText
										}
									}
								}
								variants(first: 100) {
									edges {
										node {
											id
											price
										}
									}
								}
							}
							cursor
						}
						pageInfo {
							hasNextPage
							endCursor
						}
					}
				}
			`,
			{
				variables: {
					after
				}
			}
		);

		return {
			products: response.data.products.edges.map(({ node }) => ({
				id: node.id,
				title: node.title,
				status: node.status,
				//
				images: node.images.edges.map((image) => ({
					url: image.node.url,
					altText: image.node.altText
				})),
				//
				variants: node.variants.edges.length,
				price_range: node.variants.edges
					.map((variant) => parseFloat(variant.node.price))
					.sort((a, b) => a - b)
					.filter((price, index, self) => self.indexOf(price) === index)
					.join(' - '),
				//
				url: `https://${session.shopify_shop}/products/${node.handle}`
			})),
			pageInfo: response.data.products.pageInfo
		};
	} catch (error) {
		//
		console.error('Error fetching Shopify products:', error);

		return {
			products: [],
			pageInfo: {
				hasNextPage: false,
				endCursor: null
			}
		};
	}
};
