<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import SvgLogo from '$lib/svelte/svg-logo.svelte';
	import Loader from '$lib/svelte/loader.svelte';
	import SvgLoginBg from '$lib/svelte/svg-login-bg.svelte';

	import defaultConfig from '$lib/config/default';
	import { user } from '$lib/stores/state';

	let email = $state('');
	let password = $state('');
	let error = $state('-');

	let isNetworkActive = $state(false);

	const attemptLogin = async (event) => {
		//
		event.preventDefault();

		if (isNetworkActive) {
			return;
		}

		error = '-';
		isNetworkActive = true;

		// await new Promise((resolve) => setTimeout(resolve, 500));

		const loginAttempt = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (loginAttempt) {
			//
			const loginResponse = await loginAttempt.json();

			if (loginResponse.status === 'success') {
				// ˝
				localStorage.setItem('session_token', loginResponse.data.session_token);

				$user = loginResponse.data;

				goto('/');
				//
			} else {
				//
				isNetworkActive = false;
				error = loginResponse.message || 'Login failed. Please try again.';
			}
			//
		} else {
			//
			isNetworkActive = false;
			error = 'Network error. Please try again later.';
		}
	};

	onMount(() => {
		//
		if (document.location.hostname === 'localhost') {
			//
			email = 'manjeet.imaniac@gmail.com';
			password = '11111111';
		}
	});
</script>

<div class="flex h-full">
	<div
		class="relative z-10 m-auto aspect-square h-[470px] rounded-[50px] border border-neutral-700 bg-neutral-800 p-8 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-0"
	>
		<SvgLogo class="mx-auto w-1/2 fill-white" />

		<p class="mt-5 text-center text-sm text-neutral-400">Login to your account</p>

		<form class="flex flex-col" onsubmit={attemptLogin}>
			<label for="email" class="mt-5 text-sm">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				class="mt-1 h-12 rounded-lg border border-neutral-700 px-4 py-3 focus:shadow-lg focus:outline-none"
				placeholder="user@example.com"
				required
				bind:value={email}
			/>

			<label for="password" class="mt-5 text-sm">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				class="mt-1 h-12 rounded-lg border border-neutral-700 px-4 py-3 focus:shadow-lg focus:outline-none"
				placeholder="********"
				autocomplete="current-password"
				minlength="8"
				maxlength="32"
				required
				bind:value={password}
			/>

			<button
				class="mt-5 h-12 cursor-pointer rounded-lg bg-purple-800 px-4 py-3 hover:bg-purple-800/65"
				type="submit"
			>
				{#if !isNetworkActive}
					Login
				{:else}
					<Loader class="h-full" color="white" thickness="4" />
				{/if}
			</button>

			<p class="mt-1 text-center text-xs text-red-500" class:invisible={error === '-'}>
				{error}
			</p>

			<div class="mt-5 text-center text-sm text-neutral-400">
				Difficulty logging in? <a
					class="text-white underline"
					href={`mailto: ${defaultConfig.support_email}`}
				>
					Contact
				</a>
			</div>
		</form>
	</div>

	<div class="absolute top-0 z-0 h-full w-full">
		<SvgLoginBg class="-ms-[50%] h-full opacity-50" />
	</div>
</div>
