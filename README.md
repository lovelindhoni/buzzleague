![Buzzleague-Banner](https://ik.imagekit.io/lovelin/BuzzLeague/Readme-banner?updatedAt=1705848968596)

# BuzzLeague - The League for CodeBees

BuzzLeague is a leaderboard application for college students that ranks them based on their LeetCode ranking. It's a platform where the students of Chennai Institute of Technology can compete and grow together.

## Features 🚀

- Robust filtering options: List students based on their ranking, number of easy/medium/hard problems solved, department, year, etc.
- Customizable entries: The number of entries being shown can be customized.
- BuzzLeague Champion: A special section dedicated to the student with the highest LeetCode ranking.
- Save Option: Share your champion status by downloading it as an image, which can be shared on LinkedIn or Twitter.
- Keyboard Shortcuts: Use `Ctrl + <` to navigate to the previous page of the leaderboard and `Ctrl + >` to go forward.

## How to Join BuzzLeague? 📝

To join BuzzLeague, submit your valid LeetCode username along with your department, year, and email. Please ensure that your LeetCode profile lists "Chennai Institute of Technology" or "Chennai Institute of Technology and Applied Research" as your education, as this is how we verify your affiliation with CIT. If a registered student changes their username, they will be removed from BuzzLeague and will need to re-register with their new username.

## Tech Stack 💻

- [SvelteKit](https://kit.svelte.dev) - Modern framework for building fast and efficient web apps with simplicity
- [TypeScript](https://www.typescriptlang.org/) - 😅
- [PicoCSS](https://picocss.com/) - Minimal CSS Framework for semantic HTML
- [Supabase-js](https://github.com/supabase/supabase-js) - An isomorphic Javascript client for Supabase.
- [Html-to-image](https://github.com/bubkoo/html-to-image) - Generates an image from a DOM node using HTML5 canvas and SVG.

## Running Locally 🏃‍♂️

1. Clone the repository:

```bash
git clone https://github.com/lovelindhoni/buzzleague.git
```

2. Create a .env file in the root directory and add the following values:

```plaintext
SUPABASE_URL=<Your_Supabase_URL>
SUPABASE_ANON_KEY=<Your_Supabase_Anon_Key>
GITHUB_PAT=<Your_Github_Personal_Access_Token>
```

The SUPABASE_URL and SUPABASE_ANON_KEY are the credentials for your Supabase database instance. The GITHUB_PAT is your GitHub Personal Access Token which has permissions only to public repos. This environment variable is optional.

3. Run the following SQL query on the SQL editor on your Supabase dashboard to create the table with the required schema:

```sql

CREATE TYPE Year AS ENUM ('1st', '2nd', '3rd', '4th');
CREATE TYPE Department AS ENUM ('CSE-AIML', 'CSE-AIDS', 'CSE', 'CSE-CS', 'CSBS', 'ECE', 'EEE', 'BME', 'MCT', 'MECH', 'SH', 'CIVIL', 'IT', 'ACT', 'VLSI');

CREATE TABLE lcusernames (
username TEXT PRIMARY KEY,
email TEXT NOT NULL,
year Year NOT NULL,
department Department NOT NULL
);
```

4. After creating the .env file, install all the dependencies by running:

```bash
pnpm i
```

5. Start the development server by running:

```
pnpm run dev
```

This will start the development server at localhost:5173.

## License 📄

MIT

## Contact 📧

For any queries or suggestions, please feel free to reach out.

Happy Grinding! 🎉
