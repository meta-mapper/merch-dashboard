<script>
	import Icon from '@iconify/svelte';
	//
	import SvgLogo from '$lib/svelte/svg-logo.svelte';

	import { afterNavigate } from '$app/navigation';
	//
	import { user } from '$lib/stores/state';

	import navItems from '$lib/config/nav-items';

	let currentPath = $state('/');

	afterNavigate(() => {
		currentPath = document.location.pathname;
	});
</script>

<div class="sidebar flex w-80 shrink-0 flex-col gap-5 max-lg:w-60 max-md:hidden">
	<div class="rounded-[50px] bg-neutral-800 py-10">
		<SvgLogo class="mx-auto w-48 fill-white max-lg:w-32" />
	</div>

	<div class="flex grow flex-col gap-2.5 rounded-[50px] bg-neutral-800 p-5">
		{#each navItems as item}
			<a
				href={item.path}
				class="flex items-center gap-4 rounded-[50px] p-5 hover:bg-neutral-700 [&.active]:bg-purple-800 [&.active]:text-white"
				class:active={currentPath === item.path}
				class:hidden={!item.roles.includes($user.type)}
			>
				<Icon icon={item.icon} class="text-2xl" />
				<span>{item.name}</span>
			</a>
		{/each}
	</div>
</div>
