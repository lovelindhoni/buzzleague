<script lang="ts">
	import { enhance } from '$app/forms';
	import MetaData from '$lib/components/MetaData.svelte';
	export let form;
	$: ariaBusy = form ? false : null; // this variable is used for the loading animation in the submit button. Loading animation stops if the form prop exists
</script>

<MetaData
	title="Join BuzzLeague - Register with your LeetCode Username"
	description="Ready to compete on BuzzLeague? Join now by submitting your LeetCode username with CIT or CITAR as your school in your profile. Don't forget to include your department and year information"
	url="https://buzzleague.vercel.app/join"
/>
<body>
	<header class="container">
		<hgroup>
			<h1>Let's git init you on BuzzLeague!</h1>
			<hr />
			<p>
				Please make sure you have "Chennai Insititute Of Technology" or "Chennai Institute of
				Technology and Applied Research" as your school in your leetcode profile. That's how I can
				verify you!
			</p>
		</hgroup>
	</header>
	<main class="container">
		<form method="POST" use:enhance autocomplete="on">
			<label>
				Username
				<input
					name="username"
					type="text"
					required
					autocomplete="username"
					aria-invalid={form?.success == undefined ? null : !form.success}
					aria-describedby="username-input"
					placeholder="Your leetcode username..."
					on:invalid={() => (ariaBusy = false)}
				/>
				{#if form?.success != undefined && form?.success == false}
					<small id="username-input">{form?.msg ?? ''}</small>
				{/if}
			</label>
			<label>
				Email
				<input
					name="email"
					type="email"
					autocomplete="email"
					required
					placeholder="Email..."
					on:invalid={() => (ariaBusy = false)}
				/>
			</label>
			<label>
				Year
				<select name="year" required on:invalid={() => (ariaBusy = false)}>
					<option selected value=""> Which Year... </option>
					<option>1st</option>
					<option>2nd</option>
					<option>3rd</option>
					<option>4th</option>
				</select>
			</label>
			<label>
				Department
				<select name="department" required on:invalid={() => (ariaBusy = false)}>
					<option selected value=""> Select your Department... </option>
					<option>CSE-AIML</option>
					<option>CSE-CS</option>
					<option>CSE-AIDS</option>
					<option>CSE</option>
					<option>EEE</option>
					<option>IT</option>
					<option>CSBS</option>
					<option>ECE</option>
					<option>MECH</option>
					<option>MECH</option>
					<option>CIVIL</option>
					<option value="SH">S&H</option>
					<option>VLSI</option>
					<option>ACT</option>
					<option>BME</option>
				</select>
			</label>
			<div class="submission">
				<button aria-busy={ariaBusy} type="submit" on:click={() => (ariaBusy = true)}>Submit</button
				>
				{#if form?.success}
					<small>Ahoy! Welcome Aboard!</small>
				{/if}
			</div>
		</form>
	</main>
	<footer class="container">
		<strong><a data-sveltekit-reload href="/">Go to Homepage</a></strong>
	</footer>
</body>

<style>
	@media (min-width: 1024px) {
		.container {
			width: 50%;
		}
	}
	@media (max-width: 1023px) {
		.container {
			width: 90%;
		}
	}
	@media (max-width: 768px) {
		header {
			height: 20rem;
		}
	}
	@media (min-width: 768px) {
		header {
			height: 14rem;
		}
	}
	footer {
		display: flex;
		justify-content: center;
	}

	.submission small {
		color: #2a7b6f;
	}
	.submission {
		display: flex;
		align-items: baseline;
		gap: 1em;
	}
	a {
		color: #c2c7d0;
	}
</style>
