<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	//
	import Dashboard from '$lib/svelte/dashboard.svelte';
	import StatsOrder from '$lib/svelte/stats-order.svelte';
	import TableOrders from '$src/lib/svelte/table-orders.svelte';
</script>

<Dashboard>
	<!-- Cards -->
	<StatsOrder />

	<div class="mt-4 mb-2 flex items-center justify-between gap-4">
		<h2 class="text-4xl font-bold max-sm:text-2xl">Recent Orders</h2>
		<button
			class="shrink-0 cursor-pointer rounded-full bg-purple-800 px-4 py-2 hover:bg-purple-700"
			onclick={() => goto('/orders')}
		>
			View All →
		</button>
	</div>

	<TableOrders hideMoreButton={true} />
</Dashboard>
