// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //local
  URL_BACKEND: 'http://127.0.0.1:8000/',
  URL_SERVICIOS: 'http://127.0.0.1:8000/api',
  URL_FROTEND: 'http://localhost:5000',
  apiUrlMedia: "http://127.0.0.1:8000/storage/",
  //remoto
  // URL_BACKEND: 'https://malcolmcordova.com/backend-api-malcolm/',
  // URL_SERVICIOS: 'https://malcolmcordova.com/backend-api-malcolm/public/api',
  // URL_FROTEND: 'https://malcolmcordova.com',
  // apiUrlMedia: "https://malcolmcordova.com/backend-api-malcolm/storage/app/public/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
