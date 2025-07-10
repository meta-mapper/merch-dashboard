<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	//
	import '../app.css';

	import Preloader from '$lib/svelte/preloader.svelte';
	//
	import axiosClient from '$lib/js/axios-client';
	import { user } from '$src/lib/stores/state';

	let isPreloaderActive = $state(true);

	const { children } = $props();

	onMount(async () => {
		//
		const verifySessionResult = await axiosClient('/api/verify-session');

		if (verifySessionResult.status === 'success') {
			//
			$user = verifySessionResult.data;

			if (document.location.pathname === '/login') {
				//
				goto('/');
			}
			//
		} else {
			//
			goto('/login');
		}

		setTimeout(() => (isPreloaderActive = false), 500);
	});
</script>

<svelte:head>
	<link rel="icon" href="/images/favicon.png" />
</svelte:head>

<div class="layout h-screen bg-black text-white">
	{@render children()}
	{#if isPreloaderActive}
		<Preloader />
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');

	.layout {
		font-family: 'Syne', sans-serif;
	}
</style>
