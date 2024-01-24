import supabase from '$lib/server/db';
import type { Year, Department } from '$lib/types/types';
async function validateAndInsertUser(
	username: string,
	email: string,
	department: Department,
	year: Year
) {
	// checks whether the user exists on database, and he has CIT or CITAR in his leetcode profile
	const userValidation = await validateUser(username);

	if (!userValidation.success) {
		return userValidation; // if user validation is not success
	}

	const { data, error } = await supabase // inserting new user to database
		.from('lcusernames')
		//@ts-ignore
		.insert([{ username, email, year, department }]);

	if (error) {
		if (error.code === '23505') {
			// this error code is specific for trying to insert an exisiting username_value in database
			return { success: false, msg: `Leetcode user ${username} already exists in the database` };
		} else {
			return {
				success: false, // in case of some other errors
				msg: `Unexpected error occurred. Please report this error to the developer: ${error.message}`
			};
		}
	} else {
		return { success: true, msg: 'Database successfully updated' };
	}
}

export const actions = {
	default: async (event) => {
		try {
			const formData = await event.request.formData();
			const username = (formData.get('username') as string).trim();

			if (username.includes(' ')) {
				return { success: false, msg: `Username cannot contain whitespaces` };
			}

			const email = formData.get('email') as string;
			const department = formData.get('department') as Department;
			const year = formData.get('year') as Year;

			return validateAndInsertUser(username, email, department, year);
		} catch (error) {
			console.error('An error occurred while processing the request:', error);
			return {
				success: false,
				msg: 'Some error occured at the default form action in join route. Please try again later'
			};
		}
	}
};

async function validateUser(username: string) {
	try {
		const profile = await fetch(
			`https://leetcode.com/graphql?query=query{matchedUser(username:"${username}") { profile { school } }}`
		).then((response) => response.json());
		if (profile.errors) {
			return { success: false, msg: `Leetcode user ${username} doesn't exist` };
		} // checks whether that particular username exists in leetcode
		const school = String(profile.data.matchedUser.profile.school).toLowerCase().trim(); // school of leetcode user
		if (
			school !== 'chennai institute of technology and applied research' &&
			school !== 'chennai institute of technology'
		) {
			return {
				// if the school is not CIT or CITAR
				success: false,
				msg: `Please ensure your leetcode profile has "Chennai Institute Of Technology" or "Chennai Institute of Technology and Applied Research" as your school`
			};
		}
		// else all good
		return { success: true, msg: 'User is validated successfully' };
	} catch (error) {
		console.error(
			'An error occurred while checking if the username exists in the platform:',
			error
		);
		return { success: false, msg: error };
	}
}
