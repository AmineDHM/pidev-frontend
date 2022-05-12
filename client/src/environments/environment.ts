// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api',
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiYW1pbmUxNCIsImEiOiJjbDJkZmExazIwMGNoM2NyMXk2cW5wdXdwIn0.GRYBHFqp1puXjq7Z8PepCQ',
  },
  mcv: {
    RapidAPI_Host: 'microsoft-computer-vision3.p.rapidapi.com',
    RapidAPI_Key: '91dfb77e42mshdfeb181c79b1004p1f2307jsn09fd2337d643',
  },
  stripe: {
    publishable_key:
      'pk_test_51Il3FoAujkDiX9jOCpl0mlUwzIdPD7zAqrYZIXPuIXIRPCIivz2k3vgrS3njBCnogpLdcuHFi6yLIYZTJ2TCzNcm00iHKRND3T',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
