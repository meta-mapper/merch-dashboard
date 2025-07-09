<script>
	import Icon from '@iconify/svelte';

	const { label, icon, value, bg } = $$props;
</script>

<div class="card relative flex w-full gap-2.5 overflow-hidden rounded-[50px] bg-neutral-700">
	<div class="relative z-10 flex w-full flex-col items-end justify-center p-10">
		<Icon {icon} class="shrink-0" width="40" />
		<h2 class="mt-2 text-4xl font-bold">{value}</h2>
		<p class="mt-1 text-neutral-400 font-bold">{label}</p>
		<p class="mt-0 text-xs text-neutral-400 ">This month</p>
	</div>

	<div class="absolute top-0 -left-10 z-0 aspect-square h-full">
		<img src={`/images/${bg}`} alt="" class="h-full" />
		<div
			class="absolute top-0 left-0 h-full w-full bg-gradient-to-l from-neutral-700/90 to-neutral-700/70"
		></div>
	</div>
</div>
