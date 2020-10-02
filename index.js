import React from "react";

import { NativeModules, Platform } from "react-native";

const { InAppReviewModule, RNInAppReviewIOS } = NativeModules;

const isAvailable = !!RNInAppReviewIOS && RNInAppReviewIOS.isAvailable; //ios version check

function isVersionAvailable() {
  if (Platform.OS === "android" && Platform.Version >= 21) {
    if (!InAppReviewModule) {
      throw new Error(
        "InAppReview native module not available, did you forget to link the library?"
      );
    }
    return true;
  } else if (Platform.OS === "ios") {
    if (!RNInAppReviewIOS) {
      throw new Error(
        "InAppReview native module not available, did you forget to link the library?"
      );
    }
    return isAvailable;
  } else return false;
}

export default class InAppReview {
  static RequestInAppReview() {
    if (Platform.OS === "android" && isVersionAvailable()) {
      InAppReviewModule.show();
    } else if (Platform.OS === "ios" && isVersionAvailable()) {
      RNInAppReviewIOS.requestReview();
    }
  }

  static isAvailable() {
    return isVersionAvailable();
  }
}
