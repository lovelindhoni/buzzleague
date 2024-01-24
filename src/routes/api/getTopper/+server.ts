import { json } from '@sveltejs/kit';
import { TopperFlattener } from '$lib/utils/flatteners';
import type { TopperResponse } from '$lib/types/types';
const leetcodeQuery = (str: string) =>
	`https://leetcode.com/graphql?query=query {matchedUser(username: "${str}") {username githubUrl profile {  userAvatar ranking skillTags aboutMe } submitStats { acSubmissionNum { difficulty count } } }recentSubmissionList(username : "${str}"){ title statusDisplay } }`; // the graphql endpoint of leetcode which will be used by us to scrap necessary data for the Topper

export async function GET({ url, setHeaders, fetch }) {
	const username = url.searchParams.get('topper') as string; // acquiring the username of Topper through query paramters
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
	const topperResponse: TopperResponse = (
		await fetch(leetcodeQuery(username)).then((response) => response.json())
	).data;
	return json({ ...new TopperFlattener(topperResponse) });
}
