<script>
	import { onMount } from 'svelte';
	//
	import Dashboard from '$lib/svelte/dashboard.svelte';
	import DatePicker from '$lib/svelte/date-picker.svelte';
	import TableOrders from '$src/lib/svelte/table-orders.svelte';

	// 	 let startDate = getDateFromToday(days);
	//   let endDate = today;
	//   let dateFormat = 'MMM d, yyyy';
	//   let isOpen = false;

	//   let formattedStartDate = '';

	//   const onClearDates = () => {
	//     startDate = '';
	//     endDate = '';
	//   };
</script>

<Dashboard>
	<div class="mt-4 mb-2 flex items-center justify-between gap-4">
		<h2 class="text-4xl font-bold max-sm:text-2xl">Orders</h2>
		<div class="grow">
			<DatePicker />
		</div>
	</div>
	<TableOrders />
</Dashboard>
