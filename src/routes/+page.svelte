<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import User from '$lib/components/User.svelte';
	import DailyChallenge from '$lib/components/DailyChallenge.svelte';
	import Topper from '$lib/components/Topper.svelte';
	import EmptyRow from '$lib/components/EmptyRow.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import MetaData from '$lib/components/MetaData.svelte';
	export let data;
	$: pagination = 1; // The pagination level. Starts from 1
	$: tableContent = data.userData.slice(
		(pagination - 1) * Number(data.tableEntries),
		(pagination - 1) * Number(data.tableEntries) + Number(data.tableEntries)
	); // this formula slices the user content such that at most 10 users can be displayed on the table at a time.
	$: prevDisabled = true ? pagination === 1 : false; // disables the prev button if the pagination level is 1
	$: nextDisabled = true ? pagination == data.pageLimit : false; // disables the next button if the pagination level equals the maximum threshold given userData.
	function shortcuts(event: KeyboardEvent) {
		// Enables keyboard shorcuts to navigate through pages
		if (event.key === 'ArrowLeft' && !prevDisabled && event.ctrlKey) {
			pagination--;
		} else if (event.key === 'ArrowRight' && !nextDisabled && event.ctrlKey) {
			pagination++;
		}
	}
</script>

<MetaData
	title="BuzzLzeague - League For Codebees"
	description="BuzzLeague, the leaderboard for CIT's CodeBee students, highlighting their LeetCode prowess. Follow the coding journey and see who's leading the pack in skill and expertise"
/>
<body>
	<Header />
	<main class="container">
		<div class="filters">
			<div>
				{#if data.department == 'All' && data.year == 'All'}
					<strong>All Students</strong> <!--If data is not filtered-->
				{:else if data.department == 'All'}
					<strong>All {data.year} year Students</strong> <!--If data is filtered only year wise-->
				{:else if data.year == 'All'}
					<strong>All {data.department} Students</strong>
					<!--If data is filtered only department wise-->
				{:else}
					<strong>All {data.year} year {data.department} Students</strong>
					<!--If data is filtered on both year and department wise-->
				{/if}
				<p>({pagination}/{data.pageLimit})</p>
				<!--Displays the pagination level-->
				<br />
				{#if data.sortingKey === 'ranking'}
					<p>By Ranking</p>
				{:else}
					<p>By no. of {data.sortingKey} Problems Solved</p>
				{/if}
			</div>
			<Filter
				department={data.department}
				year={data.year}
				tableEntries={data.tableEntries}
				sortingKey={data.sortingKey}
			/>
		</div>
		<figure>
			<table class="striped">
				<thead>
					<tr>
						<th>Place</th>
						<th>Username</th>
						<th>Ranking</th>
						<th>Easy</th>
						<th>Medium</th>
						<th>Hard</th>
						<th>Year</th>
						<th>Department</th>
					</tr>
				</thead>
				<tbody>
					{#if tableContent.length === 0}
						<!--If there are no users matching the filtering criteria, then empty rows are printed-->
						{#each { length: Number(data.tableEntries) } as _}
							<EmptyRow />
						{/each}
					{:else}
						{#each tableContent as content, idx (content.username)}
							<User {...content} place={(pagination - 1) * Number(data.tableEntries) + idx + 1} />
						{/each}
						{#if tableContent.length < Number(data.tableEntries)}
							<!--If the table content is less than 10, then the remaining rows are printed empty-->
							{#each { length: Number(data.tableEntries) - tableContent.length } as _}
								<EmptyRow />
							{/each}
						{/if}
					{/if}
				</tbody>
			</table>
		</figure>
		<section class="pagination">
			<p>Showing {data.tableEntries} entries</p>
			<div class="btn">
				<button on:click={() => pagination--} disabled={prevDisabled} data-tooltip="ctrl + <"
					>pre</button
				>
				<button on:click={() => pagination++} disabled={nextDisabled} data-tooltip="ctrl + >"
					>next</button
				>
			</div>
		</section>
		<article>
			<hgroup>
				<h2>Not in buzzleague? Got you covered!</h2>
				<hr />
				<p>
					You will be removed if you change your username. In that case, re-join with your new
					username
				</p>
			</hgroup>
			<br />
			<a role="button" href="/join">Join</a>
		</article>
		<Topper
			username={data.topper.username}
			department={data.topper.department}
			year={data.topper.year}
		/>
		<DailyChallenge />
	</main>
	<Footer />
</body>
<svelte:window on:keydown={shortcuts} />

<style>
	main {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
	thead tr {
		height: 4em;
	}
	figure {
		height: initial;
	}

	.btn {
		gap: 1rem;
	}
	.pagination {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.filters {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}
	.filters p {
		display: inline;
	}
	section {
		margin-top: 1rem;
	}
</style>
