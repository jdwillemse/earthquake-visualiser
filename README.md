# Earthquake distance visualiser

[https://earthquake-visualiser.vercel.app/](https://earthquake-visualiser.vercel.app/)

Using the data provided by the USGS API I chose to display the features according to their lat long position. The user's position is also indicated using the native geolocation API. The USGS endpoint data is updated at constant intervals so my app also polls the API at these intervals to keep data up to date.

When the user interacts with the feature markers a tooltip is shown that gives basic info about the feature and the distance from the user to the feature. I aimed to incorporate best accessibility practices here.

I chose to not make use of any mapping APIs as I thought that would be the most obvious use. Instead this app is meant to function as a infografic rather than literal data representation.

## Technology

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Redux is used for state management
- The Framer motion animation library is minimally used for its presence feature

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
