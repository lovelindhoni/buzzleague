<script lang="ts">
	import FilterSvg from '$lib/assets/assorted/Filter.svg';
	import type { Year, Department, Entries, SortingKey } from '$lib/types/types';
	export let department: Department; // department ,year and tableEntries are passed down by parent route
	export let year: Year;
	export let tableEntries: Entries;
	export let sortingKey: SortingKey;
	let open: boolean; // open and closes the modal
	function closeModal(node: HTMLElement) {
		// This action is bound to the article tag.
		function closeAtClick(event: MouseEvent) {
			// Whenever somewhere outside the modal is clicked.
			if (!node.contains(event.target as Node)) {
				open = false;
			}
		}
		function closeAtEsc(event: KeyboardEvent) {
			// If escape key is clicked.
			if (event.key === 'Escape') {
				open = false;
			}
		}
		document.addEventListener('click', closeAtClick, { passive: true, capture: true });
		document.addEventListener('keydown', closeAtEsc, { passive: true, capture: true });
		return {
			destroy() {
				document.removeEventListener('click', closeAtClick);
				document.removeEventListener('keydown', closeAtEsc);
			}
		};
	}
</script>

<div class="filter-btn">
	<button on:click={() => (open = true)} class="secondary">
		<img src={FilterSvg} alt="filter-icon" />
		Filters
	</button>
</div>
<dialog {open}>
	<article use:closeModal>
		<h2>Filter Options</h2>
		<hr />
		<form method="POST">
			<fieldset>
				<label
					>Year:
					<select name="year" aria-label="Filter By Year" required bind:value={year}>
						<option>All</option>
						<option>1st</option>
						<option>2nd</option>
						<option>3rd</option>
						<option>4th</option>
					</select>
				</label>
				<label
					>Department:
					<select
						name="department"
						aria-label="Filter By Department"
						required
						bind:value={department}
					>
						<option>All</option>
						<option>CSE-AIML</option>
						<option>CSE-CS</option>
						<option>CSE-AIDS</option>
						<option>CSE</option>
						<option>EEE</option>
						<option>IT</option>
						<option>CSBS</option>
						<option>ECE</option>
						<option>MECH</option>
						<option>MCT</option>
						<option>CIVIL</option>z
						<option value="SH">S&H</option>
						<option>VLSI</option>
						<option>ACT</option>
						<option>BME</option>
					</select>
				</label>
				<label>
					Sort By:
					<select name="sortingKey" aria-label="sorting criteria" required bind:value={sortingKey}>
						<option value="ranking">Ranking</option>
						<option>Easy</option>
						<option>Medium</option>
						<option>Hard</option>
					</select>
				</label>
				<label>
					Entries
					<select name="entries" aria-label="Table entries" required bind:value={tableEntries}>
						<option>5</option>
						<option>10</option>
						<option>15</option>
						<option>25</option>
					</select>
				</label>
			</fieldset>
			<footer>
				<div>
					<!--The form data is passed to the default action present in the route-->
					<button type="submit">Confirm</button>
					<button class="secondary" on:click|preventDefault={() => (open = false)}>Cancel</button>
					<button
						class="outline contrast"
						on:click|preventDefault={() => {
							department = 'All';
							year = 'All';
							sortingKey = 'ranking';
							tableEntries = '10';
						}}>Reset</button
					>
				</div>
			</footer>
		</form>
	</article>
</dialog>

<style>
	.filter-btn button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	}
	img {
		height: 1.2rem;
		width: 1.2rem;
	}
	footer {
		display: flex;
		justify-content: end;
		align-items: center;
		gap: 0.25rem;
		margin-top: 1rem;
	}
	form {
		margin-top: 1.2rem;
	}
	@media (min-width: 768px) {
		fieldset {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
		}
	}
</style>
