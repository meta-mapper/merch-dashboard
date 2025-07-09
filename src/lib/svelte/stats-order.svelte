<script>
	import moment from 'moment';

	import { onMount } from 'svelte';

	import MetricCard from '$lib/svelte/metric-card.svelte';

	import axiosClient from '$lib/js/axios-client.js';

	let orders = $state('-');
	let sales = $state('-');

	onMount(async () => {
		//
		const statsResponse = await axiosClient({
			url: '/api/order-stats',
			params: {
				start_date: moment().startOf('month').format('YYYY-MM-DD'),
				end_date: moment().endOf('month').format('YYYY-MM-DD')
			}
		});

		if (statsResponse.status === 'success') {
			//
			orders = statsResponse.data.orderCount;
			sales = statsResponse.data.totalSales;
			//
		} else {
			//
			orders = 'Error';
			sales = 'Error';
		}
	});
</script>

<div class="flex h-52 gap-5">
	<div class="grow basis-0">
		{#key orders}
			<MetricCard label="Orders" icon="mdi:cart" value={orders} bg="orders.png" />
		{/key}
	</div>

	<div class="grow basis-0">
		{#key sales}
			<MetricCard label="Sales" icon="mdi:cash" value={sales} bg="rupee.png" />
		{/key}
	</div>
</div>
