import { getShopifyClient } from '$lib/js/shopify';
import { createDateFilter } from '$lib/js/date';

const gql = (x) => x[0];

export default async ({ session, startDate = null, endDate = null }) => {
	//
	try {
		const shopifyClient = getShopifyClient(session);
		const dateFilter = createDateFilter(startDate, endDate);

		let allOrders = [];
		let hasNextPage = true;
		let after = null;

		// Fetch all orders with pagination
		while (hasNextPage) {
			//
			const response = await shopifyClient.request(
				gql`
					query GetOrders($after: String, $query: String) {
						orders(first: 250, after: $after, query: $query, sortKey: ID, reverse: true) {
							edges {
								node {
									id
									totalPriceSet {
										shopMoney {
											amount
											currencyCode
										}
									}
								}
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
						after,
						query: dateFilter
					}
				}
			);

			allOrders = allOrders.concat(response.data.orders.edges);
			hasNextPage = response.data.orders.pageInfo.hasNextPage;
			after = response.data.orders.pageInfo.endCursor;
		}

		const orderCount = allOrders.length;

		const totalSales = allOrders.reduce((sum, { node }) => {
			return sum + parseFloat(node.totalPriceSet.shopMoney.amount);
		}, 0);

		return {
			orderCount,
			totalSales: totalSales.toFixed(2)
		};
		//
	} catch (error) {
		//
		console.error('Error fetching Shopify order stats:', error);

		return {
			orderCount: 0,
			totalSales: '0.00'
		};
	}
};
