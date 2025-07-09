<script>
	import Loader from '$lib/svelte/loader.svelte';

	import axiosClient from '$lib/js/axios-client.js';

	import { usersTableComponentInView } from '$lib/stores/state.js';

	const { refreshData } = $props();

	let type = $state('');
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let apiKey = $state('');
	let apiSecret = $state('');
	let shopUrl = $state('');
	let accessToken = $state('');
	let error = $state('-');

	let isDataLoading = $state(false);

	const createUser = async (event) => {
		//
		if (event.type === 'keypress' && event.key !== 'Enter') {
			return;
		}

		event.preventDefault();

		error = '-';
		isDataLoading = true;

		const apiResponse = await axiosClient({
			method: 'POST',
			url: '/api/create-user',
			data: {
				type,
				name,
				email,
				password,
				shopify_api_key: apiKey,
				shopify_api_secret: apiSecret,
				shopify_shop: shopUrl,
				shopify_access_token: accessToken
			}
		});

		if (apiResponse?.status === 'success') {
			//
			await refreshData();
			
			isDataLoading = false;
			$usersTableComponentInView = 'table';
			//
			//
		} else {
			//
			error = 'Failed, verify all data was correct and try again.';
		}

		isDataLoading = false;
	};
</script>

<div class="rounded-[50px] bg-neutral-800 px-10 py-5">
	<div class="flex flex-wrap gap-5">
		<div class="flex grow basis-[40%] flex-col">
			<label for="type" class="text-neutral-600">Type</label>
			<select
				id="type"
				name="type"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				required
				bind:value={type}
				onkeypress={createUser}
			>
				<option value="" disabled selected>Select user type</option>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="name" class="text-neutral-600">Name</label>
			<input
				id="name"
				type="text"
				name="name"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter your name"
				required
				bind:value={name}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="email" class="text-neutral-600">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter your email"
				required
				bind:value={email}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="password" class="text-neutral-600">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter your password"
				required
				minlength="8"
				maxlength="32"
				bind:value={password}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="apiKey" class="text-neutral-600">API Key</label>
			<input
				id="apiKey"
				type="text"
				name="apiKey"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter shopify API key"
				required
				bind:value={apiKey}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="apiSecret" class="text-neutral-600">API Secret</label>
			<input
				id="apiSecret"
				type="text"
				name="apiSecret"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter shopify API secret"
				required
				bind:value={apiSecret}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="shop" class="text-neutral-600">Shop</label>
			<input
				id="shop"
				type="text"
				name="shop"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter your shop url"
				required
				bind:value={shopUrl}
				onkeypress={createUser}
			/>
		</div>

		<div class="flex grow basis-[40%] flex-col">
			<label for="accessToken" class="text-neutral-600">Access Token</label>
			<input
				id="accessToken"
				type="text"
				name="accessToken"
				class="rounded-full bg-neutral-700 px-5 py-2 focus:outline-none"
				placeholder="Enter shopify app access token"
				required
				bind:value={accessToken}
				onkeypress={createUser}
			/>
		</div>
	</div>

	<div class="mt-5 flex items-center justify-end gap-5 max-sm:flex-col max-sm:gap-1">
		<p class="text-red-700" class:invisible={error === '-'}>{error}</p>

		<button
			type="submit"
			class="w-40 cursor-pointer rounded-full bg-neutral-700 px-6 py-3 hover:bg-neutral-600 focus:outline-none"
			onclick={createUser}
		>
			{#if isDataLoading}
				<Loader class="w-4" />
			{:else}
				Create User
			{/if}
		</button>
	</div>
</div>
