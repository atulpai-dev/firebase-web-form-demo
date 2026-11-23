# Firebase Web Form Demo

A small static web form demo with email and password fields. The page is `index.html`, with its stylesheet in `assets/css/` and form handler in `assets/js/`.

## What this demo does

This project does **not** use Firebase Authentication. The submit handler in `assets/js/form.js` pushes the entered email and password to Firebase Realtime Database under the `form` path. The “Log in” link is only a placeholder; there is no login flow.

## Security warning

Passwords sent to Realtime Database are stored as ordinary data, not as Firebase Authentication credentials. This is unsafe. **Do not enter real passwords or reuse credentials from any other service.** This demo is not suitable for production. Use Firebase Authentication for real account creation and sign-in, and secure any database separately with appropriate rules.

## Run locally

The page loads Firebase's JavaScript SDK from a CDN, so an internet connection is required. Serve the project over HTTP rather than opening the HTML file directly. For example, with Python installed:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. The Firebase web app configuration currently lives in `assets/js/form.js`; update it for a Firebase project with Realtime Database enabled if you want to test the demo. Database access also depends on that project's Realtime Database rules.

## Project files

- `index.html` — account form and page entry point.
- `assets/css/style.css` — page styling.
- `assets/js/form.js` — Firebase Realtime Database form handler.
