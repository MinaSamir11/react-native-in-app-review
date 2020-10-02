import React from "react";

import { NativeModules, Platform } from "react-native";

const { InAppReviewModule, InAppReview } = NativeModules;

const isAvailable = !!InAppReview && InAppReview.isAvailable; //ios version check

function isVersionAvailable() {
  if (Platform.OS === "android" && Platform.Version >= 21) {
    if (!InAppReviewModule) {
      throw new Error(
        "InAppReview native module not available, did you forget to link the library?"
      );
    }
    return true;
  } else if (Platform.OS === "ios") {
    if (!InAppReview) {
      throw new Error(
        "InAppReview native module not available, did you forget to link the library?"
      );
    }
    return isAvailable;
  } else return false;
}

export default class InAppReview {
  static RequestInAppReview() {
    if (isVersionAvailable()) {
      InAppReviewModule.show();
    } else if (isVersionAvailable()) {
      InAppReview.show();
    }
  }

  static isAvailable() {
    return isVersionAvailable();
  }
}
