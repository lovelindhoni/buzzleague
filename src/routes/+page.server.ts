import type { User, Department, Year, Entries, SortingKey } from '$lib/types/types';
let department: Department = 'All';
let year: Year = 'All';
let tableEntries: Entries = '10';
let sortingKey: SortingKey = 'ranking';
export const actions = {
	default: async (event) => {
		// this action acquires form data from the filter component.
		const formData = await event.request.formData();
		tableEntries = formData.get('entries') as Entries;
		department = formData.get('department') as Department;
		year = formData.get('year') as Year;
		sortingKey = formData.get('sortingKey') as SortingKey;
	}
};
export const load = async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=300'
	});
	let userData: User[] = await fetch(`/api/getUsers`).then((response) => response.json()); // returns an array of user data, sorted by their ranking descendingly
	let topper = userData[0]; // leetcode user with the highest ranking
	if (sortingKey === 'contestRating') {
		userData.sort((a, b) => b[sortingKey] - a[sortingKey]);
		topper = userData[0]; // leetcode user with the highest contest rating
	}
	userData = userData.filter((element) => {
		// filters the users based on department and year, if those values are not "All"
		return (
			(department == 'All' || element.department == department) &&
			(year == 'All' || element.year == year)
		);
	});
	if (sortingKey !== 'ranking' && sortingKey !== 'contestRating') {
		userData.sort((a, b) => b[sortingKey] - a[sortingKey]);
	}
	return {
		userData, // filtered userdata
		topper, // passed to the Topper component
		pageLimit: Math.ceil(userData.length / Number(tableEntries)) || 1, // this is the last possible pagination level of table
		department, // department, year and tableEntries are passed back to the filter component.
		year,
		sortingKey,
		tableEntries
	};
};
