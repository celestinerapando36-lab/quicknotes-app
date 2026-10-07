# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, give each one a category (Personal, Work or Study), search through them and delete the ones you no longer need. Everything is saved in your browser, so your notes are still there after a refresh.

## Features

- Add notes with a category and an automatic date and time
- Validation: empty notes and notes over 200 characters show an error message
- Live character counter that warns you as you approach the 200 limit
- Delete any single note
- Live search that ignores upper and lower case
- Note counter ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Notes saved with localStorage
- Colour-coded category cards and a responsive layout for small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/celestinerapando36-lab/quicknotes-app.git`
2. Open the folder: `cd quicknotes-app`
3. Open `index.html` in your browser (double-click it, or use Live Server in VS Code).

No build step or installation is needed.

## What I learned

- How to build a page with semantic HTML tags and link labels to inputs.
- How to use Flexbox and a media query to make a layout work on phones.
- How to build the page from an array of objects with `createElement` and `textContent`, which is safer than `innerHTML`.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use small, clear Git commits to track progress.
