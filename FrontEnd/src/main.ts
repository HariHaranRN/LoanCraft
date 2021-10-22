import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

Amplify.configure({
  aws_appsync_region: "us-east-1", // Stack region
  aws_appsync_graphqlEndpoint: "https://h475ruhmebgippfz7dlborugzy.appsync-api.us-east-1.amazonaws.com/graphql", // AWS AppSync endpoint
  aws_appsync_authenticationType: "API_KEY", //Primary AWS AppSync authentication type
  aws_appsync_apiKey: "da2-atj7c765sfgyljvq3zdmuijeiu" // AppSync API Key
});
