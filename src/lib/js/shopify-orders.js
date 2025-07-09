import { getShopifyClient } from '$lib/js/shopify';
import { createDateFilter } from '$lib/js/date';

const gql = (x) => x[0];

export default async ({ session, after = null, startDate = null, endDate = null }) => {
	//
	try {
		//
		const shopifyClient = getShopifyClient(session);

		const dateFilter = createDateFilter(startDate, endDate);

		// console.log('dateFilter', dateFilter);

		const response = await shopifyClient.request(
			gql`
				query GetOrders($after: String, $query: String) {
					#
					orders(first: 10, after: $after, query: $query, sortKey: ID, reverse: true) {
						edges {
							node {
								id
								name
								lineItems(first: 10) {
									edges {
										node {
											title
											quantity
											variant {
												title
												displayName
												product {
													handle
												}
											}
										}
									}
								}
								totalPriceSet {
									shopMoney {
										amount
										currencyCode
									}
								}
								displayFulfillmentStatus
								displayFinancialStatus
								processedAt
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

		return {
			orders: response.data.orders.edges.map(({ node }) => ({
				//
				id: node.id,
				name: node.name,

				products: node.lineItems.edges.map((lineItem) => ({
					name: lineItem.node.title,
					quantity: lineItem.node.quantity,
					url: `https://${session.shopify_shop}/products/${lineItem.node.variant.product.handle}`
				})),
				totalPrice: {
					amount: node.totalPriceSet.shopMoney.amount,
					currencyCode: node.totalPriceSet.shopMoney.currencyCode
				},
				fulfillmentStatus: node.displayFulfillmentStatus,
				paymentStatus: node.displayFinancialStatus,
				processedAt: node.processedAt
			})),
			pageInfo: response.data.orders.pageInfo
		};
		//
	} catch (error) {
		//
		console.error('Error fetching Shopify orders:', error);

		return {
			orders: [],
			pageInfo: {
				hasNextPage: false,
				endCursor: null
			}
		};
	}
};
