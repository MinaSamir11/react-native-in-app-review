import React from "react";

import { NativeModules, Platform } from "react-native";

const { InAppReviewModule } = NativeModules;

class InAppReview {
  static RequestInAppReview() {
    if (Platform.OS === "android" && Platform.Version === 21) {
      InAppReviewModule.show();
    }
  }
}

export default InAppReview;
