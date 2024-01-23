<script lang="ts">
	import '@picocss/pico';
</script>

<slot />

<style>
	:global([data-theme='dark']) {
		--pico-text-selection-color: rgba(245, 107, 61, 0.1875);
		--pico-primary: rgb(245, 107, 61);
		--pico-primary-background: rgb(210, 67, 23);
		--pico-primary-underline: rgba(245, 107, 61, 0.5);
		--pico-primary-hover: rgb(248, 162, 131);
		--pico-primary-hover-background: rgb(231, 75, 26);
		--pico-primary-focus: rgba(245, 107, 61, 0.25);
		--pico-primary-inverse: rgb(255, 255, 255);
	}
</style>
