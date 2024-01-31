import supabase from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { User, UserResponse, DatabaseQuery } from '$lib/types/types';
import { UserFlattener } from '$lib/utils/flatteners';
const leetcodeQuery = (
	str: string
) => `https://leetcode.com/graphql?query=query {matchedUser(username: "${str}") {profile {
userAvatar ranking } submitStats { acSubmissionNum { difficulty count } } } userContestRanking(username: "${str}") { rating } }`; // leetcode's graphql endpoint used by us to scrap data for users
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
	const { data, error } = await supabase.from('lcusernames').select('username, year, department');
	if (error) throw Error(error.message);
	let filteredUsers: DatabaseQuery[] = data;
	const deadUsers: string[] = []; // If a user changes his/her username then, he/she deemed to be a dead user
	const goodUsers: UserResponse[] = [];
	const fetchPromises = data.map((user) =>
		fetch(leetcodeQuery(user.username)).then((response) => response.json())
	);
	// Waiting for all fetch requests to complete
	const results = await Promise.allSettled(fetchPromises);
	results.forEach((result, i) => {
		if (result.status === 'fulfilled') {
			result.value.errors ? deadUsers.push(data[i].username) : goodUsers.push(result.value);
		}
	});
	if (deadUsers.length > 0) {
		// If there are dead users, then they are filtered out.
		filteredUsers = filteredUsers.filter(
			(obj1) => !deadUsers.some((deadUser) => deadUser === obj1.username)
		);
		// The dead usernames are removed from the database also!
		const removal = await supabase.from('lcusernames').delete().in('username', deadUsers);
		if (removal.error) console.log(removal.error);
	}
	// The filteredUser object contain the username, year and department, while the goodUser object contains the rest of the information
	const userData: User[] = goodUsers.map((user, i) => new UserFlattener(user, filteredUsers[i]));
	userData.sort((a, b) => a.ranking - b.ranking); // sorts users based on their ranking
	return json(userData);
}
