import { json } from '@sveltejs/kit';
import { DailyChallengeFlattener } from '$lib/utils/flatteners';
import type { DailyChallengeResponse } from '$lib/types/types';

const leetcodeQuery = `https://leetcode.com/graphql?query=query{ activeDailyCodingChallengeQuestion { date link question { acRate difficulty title topicTags { name } } } }`; // leetcode's graphql endpoint used by us to scrape data for daily challenge

export async function GET({ setHeaders, fetch }) {
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
	const dailyChallenge: DailyChallengeResponse = (
		await fetch(leetcodeQuery).then((response) => response.json())
	).data.activeDailyCodingChallengeQuestion;

	return json({ ...new DailyChallengeFlattener(dailyChallenge) });
}
