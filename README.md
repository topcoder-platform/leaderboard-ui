# Leaderboards User Interface

UI for Topcoder Event Leaderboards

## Dependencies

Nodejs (version 8+)
Contentful API

## Configuration

You need to provide configuration values for the following:

```bash
PORT // The port on which the server will run. The default port is 3000.
CONTENTFUL_SPACE_ID // Contentful Space ID
CONTENTFUL_ACCESS_TOKEN // Contentful Delivery API access token
CONTENTFUL_HOME_ENTRY_ID // Entry id for the content relevant for the home page
CONTENTFUL_MESSAGE_ENTRY_ID // Entry id for the content relevant for the message page
CONTENTFUL_COUNTDOWN_ENTRY_ID // Entry id for the content relevant for the countdown timer page
HOST // URL address where the app is hosted, without any trailing slash "/". Example: http://localhost:3000
NODE_ENV // self explanatory
```

## Deployment

Install the dependencies

```bash
npm install
```

The app has been developed using [Next.js](https://nextjs.org/)

To make changes to the app and test locally, execute the following command

```bash
npm run dev
```

By default, the app launches on `http://localhost:3000`

The app has already been configured for deployment on heroku. No additional changes needed.

## Contentful Setup

There are 3 pages currently. Each page has its own content model and content that needs to be set up as described below

### Home page

This page would be the first page to show when a round is about to begin. It displays the Topcoder Open logo and the sponsors. It does not reveal much about the round, other than the track and the round number.

The content model for this page is as described below:

```bash
logo: // The logo that is shown in the header as well as at the center of the page
primaryColor: // The color theme to use for the header background and the track name. Value provided here should be same as the value used in a css style (example: #333333)
track: // The name of the track
round: // The round. Example "round 1"
eventStartDateTime: // The date and time when the event will start
mainSponsor: // The image for the main sponsor
otherSponsors // Images for other sponsors
```

### Message page

This page is useful to show an informative message to the user. Besides the messages in the ticker, this page also contains a primary message that can be shown to the user.

The content model for this page is as described below:

```bash
logo: // The logo that is shown in the header as well as at the center of the page
primaryColor: // The color theme to use for the header background and the track name. Value provided here should be same as the value used in a css style (example: "#333333")
track: // The name of the track
round: // The round. Example "round 1"
eventStartDateTime: // The date and time when the event will start
message: // The primary message to show the user. Example: We will be back soon
tickerMessages: // List of Short Text. Messages to show to the user at the bottom ticker
tickerType: // Media. Used to display the type of messages that will be shown in the ticker
tickerSeparator: // Media. Separator that is shown in between messages in the ticker
mainSponsor: // The image for the main sponsor
otherSponsors // Images for other sponsors
```

### Countdown Timer page

This page is used to show a countdown timer that counts down until the track / round starts.

The content model for this page is as described below:

```bash
logo: // The logo that is shown in the header as well as at the center of the page
primaryColor: // The color theme to use for the header background and the track name. Value provided here should be same as the value used in a css style (example: "#333333")
track: // The name of the track
round: // The round. Example "round 1"
eventStartDateTime: // The date and time when the event will start
tickerMessages: // List of Short Text. Messages to show to the user at the bottom ticker
tickerType: // Media. Used to display the type of messages that will be shown in the ticker
tickerSeparator: // Media. Separator that is shown in between messages in the ticker
mainSponsor: // The image for the main sponsor
otherSponsors // Images for other sponsors
```
