// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD3yLdbjZNGWlKcUkLrMwdeXAYwVMioGeA",
    authDomain: "fitnesstracker-2ef9a.firebaseapp.com",
    databaseURL: "https://fitnesstracker-2ef9a.firebaseio.com",
    projectId: "fitnesstracker-2ef9a",
    storageBucket: "fitnesstracker-2ef9a.appspot.com",
    messagingSenderId: "550645231380"
  }
};
