<script lang="ts">
	import type { Year, Department } from '$lib/types/types';
	export let username: string;
	export let ranking: number;
	export let Easy: number;
	export let Medium: number;
	export let Hard: number;
	export let userAvatar: string;
	export let place: number;
	export let year: Year;
	export let department: Department;
</script>

<tr class="space-between">
	<td>{place}</td>
	<td>
		<div>
			<img src={userAvatar} alt="avatar" />
			<a href={`https://leetcode.com/${username}`} target="_blank">{username}</a>
		</div>
	</td>
	<td>{ranking}</td>
	<td>{Easy}</td>
	<td>{Medium}</td>
	<td>{Hard}</td>
	<td>{year}</td>
	<td>{department === 'SH' ? 'S&H' : department}</td>
</tr>

<style>
	a {
		color: #c2c7d0;
	}
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: max-content;
	}
	img {
		height: 2.7rem;
		border-radius: 50%;
	}
	tr {
		box-sizing: border-box;
		height: 4em;
	}
</style>
