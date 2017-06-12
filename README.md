# Walr.us

A full-stack single-page AJAX-based app that uses jQuery, Node, Express, Javascript and Restful APIs. It is built by a team of 3 people over 5 days period and was the midterm project as part of the Lighthouse Labs bootcamp curriculum. The app is a simple resource wall for learners.  

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Clone the repo
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

