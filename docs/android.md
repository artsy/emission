### Getting set up with Emission on Android

You have to be set up for React Native Android development. This _will_ take a long time. You need to go through
the official [React Native guide here](https://facebook.github.io/react-native/docs/getting-started.html).

Once you have successfully got the demo project running, then you can continue.

### Setup

Ensure you can run the iOS version. Yep.

You will need to install your fonts out of the iOS version into the Android one:

``` sh
cp Example/Pods/Artsy+UIFonts/Pod/Assets/* android/app/src/main/assets/fonts
mv "android/app/src/main/assets/fonts/ITCAvantGardeDemi_Track03.ttf" "android/app/src/main/assets/fonts/Avant Garde Gothic ITCW01Dm.ttf"
```

Next you need to set up your keys, currently this is kept in a JSON file:

``` sh
touch android/keys.android.js
```

It should look like:

``` js
export default {
  userID: '',
  accessToken: ''
};
```

That should be everything to run it.

### Differences

Emission on iOS works by each view controller creating a root Relay container, this comes from outside of React Native.

In Android - it's 100% React Native, so in `index.android.js` whatever is declared as the `emission` module in the AppRegistry becomes the root container. In the future this will probably change to the storybook.
