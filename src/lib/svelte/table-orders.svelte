<script>
	import { onMount, onDestroy } from 'svelte';

	import Loader from '$lib/svelte/loader.svelte';

	import axiosClient from '$lib/js/axios-client';

	import { ordersDateRange } from '$lib/stores/state.js';

	const { hideMoreButton } = $props();

	let isDataLoading = $state(false);
	let orders = $state([]);
	let pageInfo = $state({ hasNextPage: true, endCursor: null });
	let startDate = $state(null);
	let endDate = $state(null);
	let error = $state(null);

	const getPaymentStatusClass = (status) => {
		//
		switch (status.toLowerCase()) {
			case 'paid':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'refunded':
				return 'bg-gray-100 text-gray-800 border-gray-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const getFulfillmentStatusClass = (status) => {
		//
		switch (status.toLowerCase()) {
			case 'fulfilled':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'unfulfilled':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'partially fulfilled':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'returned':
				return 'bg-gray-100 text-gray-800 border-gray-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const refreshData = async () => {
		//
		if (isDataLoading) {
			return;
		}

		isDataLoading = true;

		const productResponse = await axiosClient({
			url: '/api/orders',
			params: {
				after: pageInfo?.endCursor,
				start_date: startDate,
				end_date: endDate
			}
		});

		orders = [...orders, ...(productResponse?.data?.orders || [])];
		pageInfo = productResponse?.data?.pageInfo || {};

		if (orders.length === 0) {
			error = 'No orders found for the selected date range.';
		} else {
			error = null;
		}

		isDataLoading = false;

		// console.log(products);
	};

	onMount(() => {
		//
		refreshData();

		const unsubscribeDateRange = ordersDateRange.subscribe((dateRange) => {
			//
			// console.log('Date Range Changed:', dateRange);

			if (dateRange) {
				//
				startDate = dateRange[0];
				endDate = dateRange[1];

				// Reset stuff for new date range
				orders = [];
				pageInfo = { hasNextPage: true, endCursor: null };

				refreshData();
			}
		});

		onDestroy(() => {
			unsubscribeDateRange();
		});
	});
</script>

<div class="overflow-x-auto rounded-[50px]">
	<table
		class="w-full divide-y divide-neutral-500 bg-neutral-800"
		class:hidden={orders.length === 0}
	>
		<thead class="bg-neutral-700">
			<tr>
				<th class="px-10 py-5 text-left font-medium uppercase">ID</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Product</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Amount</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Payment</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Fulfillment</th>
			</tr>
		</thead>

		<tbody class="divide-y divide-neutral-700">
			{#each orders as order}
				<tr class="hover:bg-neutral-700">
					<td class="px-10 py-3 font-medium">{order.name}</td>

					<td class="px-10 py-3">
						<div class="flex flex-col gap-2">
							{#each order.products as product}
								<p class="flex gap-2 text-sm">
									<a href={product.url} class="hover:underline" target="_blank">
										{product.name}
									</a>

									{#if product.quantity > 1}
										<span
											class="flex size-5 items-center justify-center rounded-full bg-neutral-600 text-gray-300"
										>
											{product.quantity}
										</span>
									{/if}
								</p>
							{/each}
						</div>
					</td>

					<td class="px-10 py-3 font-medium">
						<!-- {order.totalPrice.currencyCode} -->
						Rs.
						{order.totalPrice.amount}
					</td>

					<td class="px-10 py-3 font-medium">
						<span
							class={`rounded-full px-2 py-0.5 text-sm capitalize ${getPaymentStatusClass(order.paymentStatus)}`}
						>
							{order.paymentStatus.toLowerCase()}
						</span>
					</td>

					<td class="px-10 py-3 font-medium">
						<span
							class={`rounded-full px-2 py-0.5 text-sm capitalize ${getFulfillmentStatusClass(order.fulfillmentStatus)}`}
						>
							{order.fulfillmentStatus.toLowerCase()}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if error}
	<div class="flex flex-col items-center justify-center py-5">
		<h3 class="text-5xl font-semibold text-neutral-500">Oops</h3>
		<p class="text-neutral-500">{error}</p>
	</div>
{/if}

{#if pageInfo.hasNextPage}
	<div class="flex justify-center py-5">
		{#if isDataLoading}
			<Loader class="w-10" />
		{:else}
			<button
				class="cursor-pointer rounded bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-500"
				onclick={refreshData}
				hidden={hideMoreButton}
			>
				Load More
			</button>
		{/if}
	</div>
{/if}
