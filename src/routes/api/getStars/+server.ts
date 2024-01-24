import { json } from '@sveltejs/kit';
import { GITHUB_PAT } from '$env/static/private'; // personal access token is used to increase rate limit
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
	try {
		const response = await fetch('https://api.github.com/repos/lovelindhoni/buzzleague', {
			headers: {
				Authorization: `token ${GITHUB_PAT}`,
				Accept: 'application/vnd.github+json'
			}
		}); // gets public data of the repo
		const data = await response.json();
		return json(data.stargazers_count as number); // the stargazers count of repo
	} catch (error) {
		console.log('failed to fetch star count', error);
	}
}
