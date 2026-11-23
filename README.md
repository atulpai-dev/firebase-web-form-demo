# Firebase Web Form Demo

A small static web page demonstrating Firebase Authentication with email and password. Users can create an account, log in, and sign out. The page lives at the project root; its styles and authentication code are organized under `assets/css/` and `assets/js/`. Credentials are handled by Firebase Authentication and are never written to Realtime Database or another application database.

## Set up Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. Register a web app in the project and copy its Firebase web app configuration.
4. Copy `firebase-config.example.js` to `firebase-config.js` in the project root and fill in `apiKey`, `authDomain`, `projectId`, and `appId`. The local config file is ignored by Git.
5. In **Authentication → Settings → Authorized domains**, add the hostname where you will run or host the page.

Firebase web app configuration is client-side configuration, not a way to authorize access to private data. Do not put admin credentials or service account keys in this page. Restrict the API key to the appropriate web referrers in Google Cloud when applicable.

## Run locally

Serve the project directory over HTTP (ES modules do not work reliably from a `file://` URL). For example, with Python installed:

```sh
python -m http.server 8000
```

Open `http://localhost:8000` in a browser. Ensure `localhost` is an authorized Firebase domain.

## Hosting

Deploy `index.html`, `assets/js/form.js`, and `assets/css/style.css` to any static web host, along with your configured root-level `firebase-config.js`. Keep that file out of source control; configure your deployment process to provide it as a local build/deploy file. Add the deployed hostname to Firebase Authentication's authorized domains. The example config is intentionally blank and cannot connect until configured.

## Scope and limitations

This is a minimal learning/demo project, not a production authentication system. It has no application backend, user profile storage, password reset flow, email verification, or production monitoring. Firebase Authentication manages passwords; this app does not collect or persist them itself. Do not use this sample as the sole security boundary for sensitive data.
