# ATPL Academy

ATPL Academy is a static concept prototype for a Duolingo-inspired ATPL theory learning app. It uses plain HTML, CSS, and JavaScript, with all progress saved in `localStorage`.

Password for the prototype gate:

```text
OSM2026
```

## Files

- `index.html` - App shell, login screen, dashboard, lesson, stats, and settings views.
- `style.css` - Responsive visual design, light/dark mode, cards, progress bars, and mobile layout.
- `app.js` - Login, navigation, lesson flow, XP, streaks, progress, review mode, and reset behavior.
- `lessons.js` - Editable ATPL subject and micro-lesson data.
- `assets/academy-hero.png` - Local generated aviation background used by the password screen.

## Local preview

Open `index.html` directly in a browser, or run a simple static server from this folder:

```bash
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, `lessons.js`, and `README.md` to the repository root.
3. In GitHub, open **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root` folder.
7. Save. GitHub will publish the site and show the Pages URL.

## Editing lessons

Add or update lessons in `lessons.js`. Each subject contains a `lessons` array with this structure:

```js
{
  id: "unique-lesson-id",
  title: "Lesson title",
  explanation: "Short teaching text.",
  relevance: "Why it matters for ATPL.",
  example: "A practical example.",
  question: "Mini quiz question?",
  options: ["Option A", "Option B", "Option C"],
  correctIndex: 0,
  quizExplanation: "Shown after answering."
}
```

Keep each `id` stable after launch so existing local progress remains accurate.
