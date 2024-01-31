type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Year = '1st' | '2nd' | '3rd' | '4th' | 'All';
type Department =
	| 'CSE-AIML'
	| 'CSE-AIDS'
	| 'CSE'
	| 'ECE'
	| 'EEE'
	| 'BME'
	| 'MCT'
	| 'MECH'
	| 'SH'
	| 'CSE-CS'
	| 'CSBS'
	| 'CIVIL'
	| 'IT'
	| 'ACT'
	| 'VLSI'
	| 'All';

type Entries = '5' | '10' | '15' | '25';
type SortingKey = 'ranking' | 'Medium' | 'Hard' | 'Easy' | 'contestRating';
interface TotalSubmission {
	difficulty: Difficulty;
	count: number;
}

interface SubmitStats {
	acSubmissionNum: TotalSubmission[];
}

interface Profile {
	userAvatar: string;
	ranking: number;
	skillTags: string[];
	aboutMe: string;
}
interface UserStats {
	profile: Omit<Profile, 'aboutMe' | 'skillTags'>;
	submitStats: SubmitStats;
}

interface UserResponse {
	// Structure of response from the getUserData endpoint
	data: {
		matchedUser: UserStats;
		userContestRanking: {
			rating: number;
		};
	};
}
interface User {
	// Flattened structure of UserResponse
	username: string;
	userAvatar: string;
	ranking: number;
	Easy: number;
	Medium: number;
	Hard: number;
	year: Year;
	department: Department;
	contestRating: number;
}

interface MatchedUser {
	username: string;
	githubUrl: string | null;
	profile: Profile;
	submitStats: SubmitStats;
}
interface RecentSubmission {
	title: string;
	statusDisplay: string;
}
interface TopperResponse {
	// Structure of response from the getTopper endpoint
	matchedUser: MatchedUser;
	recentSubmissionList: RecentSubmission[];
}
interface Topper extends Profile {
	// Flatteend structure of TopperResponse
	username: string;
	github: null | string;
	totalSolved: number;
	recentSubmission: string;
	recentSubmissionStatus: string;
}
interface DailyQuestion {
	acRate: number;
	difficulty: Difficulty;
	title: string;
	topicTags: {
		name: string;
	}[];
}
interface DailyChallengeResponse {
	// Structure of response from the getDailyChallenge endpoint
	link: string;
	question: DailyQuestion;
}

interface DailyChallenge {
	// Flattened structure of DailyChallengeResponse
	link: string;
	difficulty: Difficulty;
	title: string;
	acceptanceRate: number;
	tags: string[];
}
interface DatabaseQuery {
	// Structure of queried data from database at getUserData endpoint
	username: string;
	year: Year;
	department: Department;
}
interface DatabaseInsertion extends DatabaseQuery {
	// Structure of data to be inserted into database. (Registering user)
	email: string;
}
interface DatabaseInsertionResponse {
	// Structure of response given after data insertion into database. (Registering user)
	status: number;
	body: { success: boolean; msg: string };
}
export type {
	UserResponse,
	User,
	TopperResponse,
	Topper,
	DailyChallengeResponse,
	DailyChallenge,
	Year,
	Department,
	Entries,
	SortingKey,
	DatabaseQuery,
	DatabaseInsertion,
	DatabaseInsertionResponse
};
