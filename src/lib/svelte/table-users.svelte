<script>
	import { onMount } from 'svelte';

	import Loader from '$lib/svelte/loader.svelte';
	import FormCreateUser from '$lib/svelte/form-create-user.svelte';

	import axiosClient from '$lib/js/axios-client';

	import { usersTableComponentInView } from '$lib/stores/state';

	let isDataLoading = $state(false);
	let users = $state([]);
	let error = $state(null);

	const deleteUser = async (id) => {
		//
		if (isDataLoading) {
			return;
		}

		users = [];
		isDataLoading = true;

		await axiosClient({
			url: '/api/delete-user',
			params: { id: id }
		});

		isDataLoading = false;

		await refreshData();
	};

	const refreshData = async () => {
		//
		if (isDataLoading) {
			return;
		}

		isDataLoading = true;

		const usersResponse = await axiosClient({
			url: '/api/users'
		});

		// console.log(usersResponse);

		users = usersResponse?.data || [];

		if (users.length === 0) {
			error = 'No users found, please create a user.';
		} else {
			error = null;
		}

		isDataLoading = false;
	};

	onMount(() => {
		//
		refreshData();
	});
</script>

{#if $usersTableComponentInView === 'table'}
	<div class="overflow-x-auto rounded-[50px]">
		<table
			class="w-full divide-y divide-neutral-500 bg-neutral-800"
			class:hidden={users.length === 0}
		>
			<thead class="bg-neutral-700">
				<tr>
					<th class="px-10 py-5 text-left font-medium uppercase">ID</th>
					<th class="px-10 py-5 text-left font-medium uppercase">Name</th>
					<th class="px-10 py-5 text-left font-medium uppercase">Type</th>
					<th class="px-10 py-5 text-left font-medium uppercase">Email</th>
					<th class="px-10 py-5 text-left font-medium uppercase">Actions</th>
				</tr>
			</thead>

			<tbody class="divide-y divide-neutral-700">
				{#each users as user}
					<tr class="hover:bg-neutral-700">
						<td class="px-10 py-3 font-medium">{user.id}</td>
						<td class="px-10 py-3 font-medium">{user.name}</td>
						<td class="px-10 py-3 font-medium">{user.type}</td>
						<td class="px-10 py-3 font-medium">{user.email} </td>
						<td class="flex px-10 py-3 font-medium">
							<button
								class="cursor-pointer rounded-full bg-red-800 px-3 py-1 hover:bg-red-700"
								onclick={() => deleteUser(user.id)}
							>
								Delete
							</button>
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

	{#if isDataLoading}
		<div class="flex justify-center py-5">
			<Loader class="w-10" />
		</div>
	{/if}
{:else}
	<FormCreateUser {refreshData} />
{/if}
