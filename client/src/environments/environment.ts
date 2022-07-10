// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// deployment - version 2

let production = undefined;

switch(process.env.NODE_ENV) {
    case 'production':
      production = true;
      break;
    case 'development':
    default:
      production = false;
}

export const environment = {

    production: production,
    serverUrl: `${production ? 'http://34.121.126.169:3000/api' : 'http://localhost:3000/api'}`,
    socketUrl: `${production ? 'http://34.121.126.169:3000/' : 'http://localhost:3000'}`,
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
