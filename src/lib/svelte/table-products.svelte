<script>
	import { onMount } from 'svelte';

	import Loader from '$lib/svelte/loader.svelte';

	import axiosClient from '$lib/js/axios-client';

	let isDataLoading = $state(false);
	let products = $state([]);
	let pageInfo = $state({ hasNextPage: true, endCursor: null });
	let error = $state(null);

	const getProductStatusClass = (status) => {
		//
		switch (status.toLowerCase()) {
			case 'active':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'draft':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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

		const productsResponse = await axiosClient({
			url: '/api/products',
			params: { after: pageInfo?.endCursor }
		});

		products = [...products, ...(productsResponse?.data?.products || [])];
		pageInfo = productsResponse?.data?.pageInfo || {};

		// products = [];
		// pageInfo.hasNextPage = false;

		if (products.length === 0) {
			error = 'No products found, please contact support';
		} else {
			error = null;
		}

		isDataLoading = false;

		// console.log(products);
	};

	onMount(() => {
		//
		refreshData();
	});
</script>

<div class="overflow-x-auto rounded-[50px]">
	<table
		class="w-full divide-y divide-neutral-500 bg-neutral-800"
		class:hidden={products.length === 0}
	>
		<thead class="bg-neutral-700">
			<tr>
				<th class="px-10 py-5 text-left font-medium uppercase">Image</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Product</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Status</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Variants</th>
				<th class="px-10 py-5 text-left font-medium uppercase">Price</th>
			</tr>
		</thead>

		<tbody class="divide-y divide-neutral-700">
			{#each products as product}
				<tr class="hover:bg-neutral-700">
					<td class="px-10 py-3 font-medium">
						<image
							class="size-16 rounded-lg object-cover"
							src={product.images[0]?.url || ''}
							alt={product.title}
						/>
					</td>
					<td class="px-10 py-3 font-medium">
						<a href={product.url} class="hover:underline" target="_blank">
							{product.title}
						</a>
					</td>
				
					<td class="px-10 py-3 font-medium">
						<span
							class={`rounded-full px-2 py-0.5 text-sm capitalize ${getProductStatusClass(product.status)}`}
						>
							{product.status.toLowerCase()}
						</span>
					</td>

					<td class="px-10 py-3 font-medium text-center">{product.variants}</td>
					<td class="px-10 py-3 font-medium w-52">Rs. {product.price_range} </td>
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
			>
				Load More
			</button>
		{/if}
	</div>
{/if}
