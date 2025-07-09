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

<div class="top-menu mt-2.5 hidden flex-col gap-2.5 max-md:flex">
	<div class="flex grow gap-2.5 rounded-[50px] bg-neutral-800 p-3">
		{#each navItems as item}
			<a
				href={item.path}
				class="flex grow basis-0 items-center justify-center gap-2 rounded-[50px] p-4 hover:bg-neutral-700 [&.active]:bg-purple-800 [&.active]:text-white"
				class:active={currentPath === item.path}
				class:hidden={!item.roles.includes($user.type)}
			>
				<Icon icon={item.icon} class="text-2xl" />
				<span>{item.name}</span>
			</a>
		{/each}
	</div>
</div>
