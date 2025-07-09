<script>
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import SvgLogo from '$lib/svelte/svg-logo.svelte';
	import Icon from '@iconify/svelte';

	import { user } from '$lib/stores/state';

	let isProfileDropdownOpen = $state(false);
</script>

<div class="top-bar flex items-center justify-between gap-5 py-4 lg:py-7">
	<div class="logo">
		<SvgLogo class="hidden w-48 fill-white max-md:block" />
	</div>

	<div class="flex items-center gap-5">
		<h1
			class="flex gap-5 text-right text-4xl font-bold max-lg:flex-col max-lg:gap-0 max-lg:text-3xl max-md:hidden"
		>
			<span class="text-purple-800">Welcome,</span>
			{$user.name}
		</h1>

		<div class="relative z-50">
			<button
				class="flex h-20 w-20 cursor-pointer rounded-full bg-neutral-800"
				onclick={() => (isProfileDropdownOpen = !isProfileDropdownOpen)}
				onblur={() => setTimeout(() => (isProfileDropdownOpen = false), 200)}
			>
				<span class="m-auto text-2xl">{$user.name.charAt(0)}</span>
			</button>

			{#if isProfileDropdownOpen}
				<div
					class="absolute top-22 right-0 w-56 rounded-lg border border-neutral-600 bg-neutral-800 p-4"
					in:slide={{ duration: 100 }}
					out:slide={{ duration: 100 }}
				>
					<h2 class="hidden text-center text-2xl font-bold text-white max-md:block">
						{$user.name}
					</h2>
					<p class="mb-2 hidden text-center text-sm text-neutral-400 max-md:block">
						{$user.email}
					</p>

					<button
						class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-600 max-md:justify-center"
						onclick={() => {
							isProfileDropdownOpen = false;
							localStorage.removeItem('session_token');
							goto('/login');
						}}
					>
						<Icon icon="mdi:logout" class="size-6" />
						Logout
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- <script>
	import Icon from '@iconify/svelte';
	//
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { user } from '$lib/stores/state';

	let isProfileDropdownOpen = $state(false);
</script>

<div class="flex items-center justify-between">
	<h1 class="text-2xl">Welcome, {$user.name}</h1>
		<button
			class="flex h-10 w-10 cursor-pointer rounded-full bg-gray-800 text-white"
			onclick={() => (isProfileDropdownOpen = !isProfileDropdownOpen)}
			onblur={() => setTimeout(() => (isProfileDropdownOpen = false), 200)}
		>
			<span class="m-auto">{$user.name.charAt(0)}</span>
		</button>

		{#if isProfileDropdownOpen}
			<div
				class="absolute top-12 right-0 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
				in:slide={{ duration: 100 }}
				out:slide={{ duration: 100 }}
			>
				<button
					class="flex w-full cursor-pointer items-center py-2 hover:bg-gray-100"
					onclick={() => (isProfileDropdownOpen = false)}
				>
					<Icon icon="mdi:account" class="mr-2 size-6" />
					Profile
				</button>
				<button
					class="flex w-full cursor-pointer items-center py-2 hover:bg-gray-100"
					onclick={() => {
						isProfileDropdownOpen = false;
						localStorage.removeItem('session_token');
						goto('/login');
					}}
				>
					<Icon icon="mdi:logout" class="mr-2 size-6" />
					Logout
				</button>
			</div>
		{/if}
	</div>
</div> -->
