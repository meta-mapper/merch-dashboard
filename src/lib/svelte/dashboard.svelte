<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Sidebar from '$lib/svelte/sidebar.svelte';
	import TopBar from '$lib/svelte/top-bar.svelte';
	import TopMenu from '$lib/svelte/top-menu.svelte';

	import { user } from '$lib/stores/state';

	const { children } = $props();

	onMount(() => {
		if ($user.type === 'admin') {
			goto('/users');
		}
	});
</script>

<div class="dashboard flex h-full py-5 ps-5">
	<Sidebar />

	<div class="content flex grow flex-col gap-5 overflow-y-scroll px-5">
		<TopBar />
		<TopMenu />

		<div class="content">
			{@render children()}
		</div>
	</div>

	<!-- <TopBar /> -->

	<!-- <div class="flex min-h-0 grow gap-2.5 max-md:flex-col">
		<div class="sidebar shrink-0 basis-80 max-lg:basis-48 max-md:basis-0">
			<Sidebar />
		</div>
		<div class="grow overflow-y-scroll rounded-[50px] bg-neutral-800 p-5 max-md:overflow-y-visible">
			{@render children()}
		</div>
	</div> -->

	<!-- <Sidebar />
	<div class="bg- grow p-4 pl-8">

		<div class="mt-8">
			{@render children()}
		</div>
	</div>s -->
</div>
