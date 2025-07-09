<script>
	import Loader from '$lib/svelte/loader.svelte';

	const { message } = $props();
</script>

<div
	class="preloader fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center gap-2 bg-black"
>
	<Loader class="w-12" thickness="5" />
	<p class="text-center">{message || ''}</p>
</div>
