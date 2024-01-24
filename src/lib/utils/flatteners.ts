// This file contains various flattening classes that flattens api responses into concise objects for usage.

import type {
	DailyChallenge,
	DailyChallengeResponse,
	Topper,
	TopperResponse,
	User,
	UserResponse,
	DatabaseQuery
} from '$lib/types/types';

class DailyChallengeFlattener implements DailyChallenge {
	readonly link;
	readonly difficulty;
	readonly acceptanceRate;
	readonly title;
	readonly tags;
	constructor(dailyChallengeData: DailyChallengeResponse) {
		this.link = `https://leetcode.com${dailyChallengeData.link}`;
		this.difficulty = dailyChallengeData.question.difficulty;
		this.acceptanceRate = dailyChallengeData.question.acRate;
		this.title = dailyChallengeData.question.title;
		this.tags = dailyChallengeData.question.topicTags.map((element) => element.name);
	}
}
class TopperFlattener implements Topper {
	readonly github;
	readonly username;
	readonly userAvatar;
	readonly ranking;
	readonly skillTags;
	readonly aboutMe;
	readonly recentSubmission;
	readonly recentSubmissionStatus;
	readonly totalSolved;
	constructor(user: TopperResponse) {
		this.username = user.matchedUser.username;
		this.github = user.matchedUser.githubUrl || 'https://www.github.com';
		this.ranking = user.matchedUser.profile.ranking;
		this.userAvatar = user.matchedUser.profile.userAvatar;
		this.aboutMe = user.matchedUser.profile.aboutMe || `nothing worthwhile about ${this.username}`;
		this.skillTags = (user.matchedUser.profile.skillTags.length &&
			user.matchedUser.profile.skillTags) || ['Still A Mystery'];
		this.recentSubmission = user.recentSubmissionList[0].title;
		this.recentSubmissionStatus = user.recentSubmissionList[0].statusDisplay;
		this.totalSolved = user.matchedUser.submitStats.acSubmissionNum[0].count;
	}
}
class UserFlattener implements User {
	readonly username;
	readonly userAvatar;
	readonly ranking;
	readonly Easy;
	readonly Medium;
	readonly Hard;
	readonly year;
	readonly department;
	constructor(user: UserResponse, filteredData: DatabaseQuery) {
		this.username = filteredData.username;
		this.year = filteredData.year;
		this.department = filteredData.department;
		this.userAvatar = user.data.matchedUser.profile.userAvatar;
		this.ranking = user.data.matchedUser.profile.ranking;
		this.Easy = user.data.matchedUser.submitStats.acSubmissionNum[1].count;
		this.Medium = user.data.matchedUser.submitStats.acSubmissionNum[2].count;
		this.Hard = user.data.matchedUser.submitStats.acSubmissionNum[3].count;
	}
}
export { DailyChallengeFlattener, TopperFlattener, UserFlattener };
