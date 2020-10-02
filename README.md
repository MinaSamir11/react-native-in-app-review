# react-native-in-app-review

The Google Play In-App Review API lets you prompt users to submit Play Store ratings and reviews without the inconvenience of leaving your app or game.

Generally, the in-app review can be triggered at any time throughout the user journey of your app. During the flow, the user has the ability to rate your app using the 1 to 5 star system and to add an optional comment. Once submitted, the review is sent to the Play Store and eventually displayed.

# Android, iOS platform.

# Google Play In-App Review API

[![N|Solid](https://developer.android.com/images/google/play/in-app-review/iar-flow.jpg)](https://developer.android.com/guide/playcore/in-app-review)

# App Store API

This module exposes the native iOS APIs to ask the user to rate the app in the iOS App Store directly from within the app (requires iOS >= 10.3).

<img width="300" alt="Rating Dialog" src="https://cloud.githubusercontent.com/assets/378279/24377493/d22eb0b8-133f-11e7-9968-44d186a3801f.png">

# Getting Started

```sh
$ npm install react-native-in-app-review
```

# Standard Method

**React Native 0.60 and above**

Linking is not required in React Native 0.60 and above.

**React Native 0.59 and below**

Run `react-native link react-native-in-app-review` to link the react-native-in-app-review library.
Then follow the instructions for your platform to link react-native-in-app-review into your project:

### Manual Linking

### iOS installation

<details>
  <summary>iOS details</summary>

1. In Xcode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-in-app-review` and add `InAppReview.xcodeproj`
3. In Xcode, in the project navigator, select your project. Add `libInAppReview.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

### Using [CocoaPods](https://cocoapods.org/)

Add the following to your `Podfile` and run `pod install`:

```ruby
pod 'InAppReview', :path => '../node_modules/react-native-in-app-review/ios'
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
import InAppReview from "react-native-in-app-review";
```

```javascript
InAppReview.RequestInAppReview();
```

# Android Notes:

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

# Please Note, Test using the Google Play Store

- In-app reviews require your app to be published in Play Store. However, you can test your integration without publishing your app to production using either internal test tracks or internal app sharing.

# iOS Notes:
