<script>
	import { onMount } from 'svelte';
	//
	import Dashboard from '$lib/svelte/dashboard.svelte';

	import TableUsers from '$src/lib/svelte/table-users.svelte';

	import { usersTableComponentInView } from '$lib/stores/state';
</script>

<Dashboard>
	<div class="mt-4 mb-2 flex items-center justify-between gap-4">
		<h2 class="text-4xl font-bold max-sm:text-2xl">Users</h2>
		<button
			class="shrink-0 cursor-pointer rounded-full bg-purple-800 px-4 py-2 hover:bg-purple-700"
			onclick={() => {
				$usersTableComponentInView = $usersTableComponentInView === 'table' ? 'form' : 'table';
			}}
		>
			{$usersTableComponentInView === 'table' ? 'Create User' : 'View Users'}
		</button>
	</div>

	<TableUsers />
</Dashboard>
