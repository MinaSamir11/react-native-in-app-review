# react-native-in-app-review

![npm](https://img.shields.io/npm/dw/react-native-in-app-review?logo=npm)

![npm](https://img.shields.io/npm/v/react-native-in-app-review?logo=npm)

![Travis (.com) branch](https://img.shields.io/travis/com/MinaSamir11/react-native-in-app-review/master)

![Coveralls github branch](https://img.shields.io/coveralls/github/MinaSamir11/react-native-in-app-review/master)

The Google Play In-App Review API, App store rating API lets you prompt users to submit Play Store or App store ratings and reviews without the inconvenience of leaving your app or game.

react native in app review, to rate on Play store, App Store, Generally, the in-app review flow (see figure 1 for play store, figure 2 for ios) can be triggered at any time throughout the user journey of your app. During the flow, the user has the ability to rate your app using the 1 to 5 star system and to add an optional comment for play store only. Once submitted, the review is sent to the Play Store or App store and eventually displayed.

## Would you like to support me?

<a href="https://www.buymeacoffee.com/MinaSamir" target="_blank">
  <img
    src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
    alt="Buy Me A Coffee"
    height="40px"
  />
</a>
<br />

# Android, iOS platform.

# Google Play In-App Review API

[![N|Solid](https://developer.android.com/images/google/play/in-app-review/iar-flow.jpg)](https://developer.android.com/guide/playcore/in-app-review)

# System Rating App Store API

[![N|Solid](https://developer.apple.com/design/human-interface-guidelines/ios/images/AppRating_2x.png)](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/ratings-and-reviews/#system-rating-and-review-prompts)

# Getting Started

## Installation

If you use Expo to create a project [you'll just need to](https://facebook.github.io/react-native/docs/getting-started#caveats) "[eject](https://docs.expo.io/versions/latest/expokit/eject)".

```
 expo eject
```

Install React Native In App Review package

```sh
$ npm install react-native-in-app-review

```

OR

```sh
$ yarn add react-native-in-app-review
```

# Standard Method

**React Native 0.60 and above**

Linking is not required in React Native 0.60 and above.

Don't forget to run `npx pod-install` after that !

- If you do not have CocoaPods already installed on your machine, run `sudo gem install cocoapods` to set it up the first time, after that run `npx pod-install`

**React Native 0.59 and below**

Run `react-native link react-native-in-app-review` to link the react-native-in-app-review library.
after following the instructions for your platform to link react-native-in-app-review into your project:

### Manual Linking

### iOS installation

<details>
  <summary>iOS details</summary>

### Using [CocoaPods](https://cocoapods.org/)

Add the following to your `Podfile` and run `pod install`:

```ruby
 pod 'react-native-in-app-review', :path => '../node_modules/react-native-in-app-review'
```

</details>

### Android installation

<details>
  <summary>Android details</summary>

Run `react-native link react-native-in-app-review` to link the react-native-in-app-review library.

#### **android/settings.gradle**

```gradle
include ':react-native-in-app-review'
project(':react-native-in-app-review').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-in-app-review/android')
```

#### **android/app/build.gradle**

From version >= 5.0.0, you have to apply these changes:

```diff
dependencies {
   ...
+    implementation project(':react-native-in-app-review')
}
```

#### **android/gradle.properties**

Migrating to AndroidX (needs version >= 5.0.0):

```gradle.properties
android.useAndroidX=true
android.enableJetifier=true
```

#### **Then, in android/app/src/main/java/your/package/MainApplication.java:**

On top, where imports are:

```java
import com.ibits.react_native_in_app_review.AppReviewPackage;
```

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new AppReviewPackage()
    );
}
```

</details>

# Usage

```javascript
import InAppReview from 'react-native-in-app-review';
```

```javascript
// This package is only available on android version >= 21 and iOS >= 10.3

// Give you result if version of device supported to rate app or not!
InAppReview.isAvailable();

// trigger UI InAppreview
InAppReview.RequestInAppReview()
  .then((hasFlowFinishedSuccessfully) => {
    // when return true in android it means user finished or close review flow
    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

    // when return true in ios it means review flow lanuched to user.
    console.log(
      'InAppReview in ios has lanuched successfully',
      hasFlowFinishedSuccessfully,
    );

    // 1- you have option to do something ex: (navigate Home page) (in android).
    // 2- you have option to do something,
    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

    // 3- another option:
    if (hasFlowFinishedSuccessfully) {
      // do something for ios
      // do something for android
    }

    // for android:
    // The flow has finished. The API does not indicate whether the user
    // reviewed or not, or even whether the review dialog was shown. Thus, no
    // matter the result, we continue our app flow.

    // for ios
    // the flow lanuched successfully, The API does not indicate whether the user
    // reviewed or not, or he/she closed flow yet as android, Thus, no
    // matter the result, we continue our app flow.
  })
  .catch((error) => {
    //we continue our app flow.
    // we have some error could happen while lanuching InAppReview,
    // Check table for errors and code number that can return in catch.
    console.log(error);
  });
```

# Error could happen and code number

| Error Name                    | Code Number | Description                                                                                                                                                | iOS | Android |
| ----------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------- |
| ERROR_DEVICE_VERSION          | 21          | This Device not supported to launch InAppReview                                                                                                            | ✅  | ✅      |
| GOOGLE_SERVICES_NOT_AVAILABLE | 22          | This Device doesn't support google play services                                                                                                           | ❌  | ✅      |
| [DYNAMIC ERROR NAME]          | 23          | Unexpected error occur may return different error from different user and device check code number to get discovered errors messages that could be happen. | ❌  | ✅      |
| ACTIVITY_DOESN'T_EXIST        | 24          | Unexpected error occur while getting activity                                                                                                              | ❌  | ✅      |
| SCENE_DOESN'T_EXIST           | 25          | Unexpected error occur while getting scene                                                                                                                 | ✅  | ❌      |

# + Android guidlelines and notes:

# Read very well:

After publishing you app to test your integration in production or either internal test tracks or internal app sharing and prompt in app review flow you may face issue that not showing review popup after you followed all guidelines very well,
**Note that this issue was classified as google play api issue.**

We found most probably solutions that may be successful to launch review popup:

- Make sure you have installed latest google play store update.
- Note that the popup will not work if you are signed in to the Play Store with a GSuite ID. Once you switch to an @gmail email address, this will start working.
- Make sure there is only one Google account in the test device.
- Please note, that user must be a tester if you are testing on any testing track.
- CLEAR CACHE and CLEAR STORAGE from Google Play Store app.
- Remove existing app rating in Google Play Store.
- after doing all of pervious solutions, remove your app and reinstall it.

# When to request an in-app review

Follow these guidelines to help you decide when to request in-app reviews from users:

- Trigger the in-app review flow after a user has experienced enough of your app or game to provide useful feedback.
- Do not prompt the user excessively for a review. This approach helps minimize user frustration and limit API usage (see the section on quotas).
- Your app should not ask the user any questions before or while presenting the rating button or card, including questions about their opinion (such as “Do you like the app?”) or predictive questions (such as “Would you rate this app 5 stars”).

# Quotas

To provide a great user experience, Google Play enforces a quota on how often a user can be shown the review dialog. Because of this, calling a launchReviewFlow method might not always display a dialog. For example, you should not have a call-to-action option (such as a button) to trigger a review as a user might have already hit their quota and the flow won’t be shown, presenting a broken experience to the user.

# Device requirements

In-app reviews only work on the following devices:

- Android devices (phones and tablets) running Android 5.0 (API level 21) or higher that have the Google Play Store installed.
- Chrome OS devices that have the Google Play Store installed.

# Please Note, To test your integration using the Google Play Store

- In-app reviews require your app to be published in Play Store. However, you can test your integration without publishing your app to production using either internal test tracks or internal app sharing.

# Troubleshooting:

As you integrate and test in-app reviews, you might run into some issues. The following table outlines the most common issues that can prevent the in-app review dialog from displaying in your app:

| Issue                                                                               | Solution                                                                                                                                                             |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Your app is not published yet in the Play Store.                                    | Your app doesn't have to be published to test, but your app's applicationID must be available at least in the internal testing track.                                |
| The user account can't review the app.                                              | Your app must be in the user's Google Play library. To add your app to the user's library, download your app from the Play Store using that user's account.          |
| The primary account is not selected in the Play Store.                              | When multiple accounts are available in the device, ensure that the primary account is the one selected in the Play Store.                                           |
| The user account is protected (for example, with enterprise accounts).              | Use a Gmail account instead.                                                                                                                                         |
| The user has already reviewed the app.                                              | Delete the review directly from Play Store.                                                                                                                          |
| The quota has been reached.                                                         | Use an internal test track or internal app sharing.                                                                                                                  |
| There is an issue with the Google Play Store or Google Play Services on the device. | This commonly occurs when the Play Store was sideloaded onto the device. Use a different device that has a valid version of the Play Store and Google Play Services. |

---

# + iOS Notes:

# System Rating and Review Prompts

The system offers a consistent, nonintrusive way for apps to request ratings and reviews. To use this feature, you simply identify places in your app's user experience where it makes sense to ask for feedback. If the user hasn't already given feedback, the system displays an in-app prompt that asks for a rating and an optional written review. The user can supply feedback or dismiss the prompt with a single tap. (In Settings, the user can also opt out of receiving these rating prompts for all apps they have installed.) The system automatically limits the display of the prompt to three occurrences per app within a 365-day period.

# When to request an in-app-review

- Ask for a rating only after the user has demonstrated engagement with your app. For example, prompt the user upon the completion of a game level or productivity task. Never ask for a rating on first launch or during onboarding. Allow ample time to form an opinion.

- Don’t interrupt the user, especially when they’re performing a time-sensitive or stressful task. Look for logical pauses or stopping points, where a rating request makes the most sense.

- Don’t be a pest. Repeated rating prompts can be irritating, and may even negatively influence the user’s opinion of your app. Allow at least a week or two between rating requests and only prompt again after the user has demonstrated additional engagement with your app.

- Don't use buttons or other controls to request feedback. Since the system limits how often rating prompts occur, attempting to request feedback in response to a control may result in no rating prompt being displayed.

# Please Note, To test your integration using the App Store

- When you call this method while your app is still in development mode, a rating/review request view is always displayed so that you can test the user interface and experience. However, this method has no effect when you call it in an app that you distribute using TestFlight.

## How to test your code

Because it's a native module, you might need to mock this package to run your tests.
Here is an example for Jest, adapt it to your needs :

```js
// __mocks__/react-native-in-app-review.js

module.exports = {
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn(),
  // add more methods as needed
};
```
