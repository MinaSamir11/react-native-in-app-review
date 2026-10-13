import {NativeModules, Platform} from 'react-native';

const {InAppReviewModule, RNInAppReviewIOS} = NativeModules;

// Resolve the iOS `isAvailable` constant across both the legacy bridge and the
// new architecture (bridgeless / TurboModule interop). Legacy modules expose
// `constantsToExport()` values as direct properties (RNInAppReviewIOS.isAvailable),
// while the new architecture surfaces them through getConstants(). When the
// native module is present but the constant isn't surfaced (new arch), default to
// true — StoreKit review is available and requestReview guards the iOS version natively.
function isIOSReviewAvailable() {
  if (!RNInAppReviewIOS) {
    return false;
  }

  if (typeof RNInAppReviewIOS.isAvailable === 'boolean') {
    return RNInAppReviewIOS.isAvailable; //ios version check
  }

  if (typeof RNInAppReviewIOS.getConstants === 'function') {
    const constants = RNInAppReviewIOS.getConstants();
    if (constants && typeof constants.isAvailable === 'boolean') {
      return constants.isAvailable;
    }
  }

  return true;
}

function isModuleAvailable() {
  if (Platform.OS === 'android') {
    if (!InAppReviewModule) {
      throw new Error(
        'InAppReview native module not available, did you forget to link the library?',
      );
    }
    return true;
  } else if (Platform.OS === 'ios') {
    if (!RNInAppReviewIOS) {
      throw new Error(
        'InAppReview native module not available, did you forget to link the library?',
      );
    }
    return true;
  } else {
    return false;
  }
}

export default class InAppReview {
  static RequestInAppReview() {
    if (isModuleAvailable()) {
      if (Platform.OS === 'android') {
        return InAppReviewModule.show();
      } else {
        return RNInAppReviewIOS.requestReview();
      }
    }
  }

  static requestInAppCommentAppGallery() {
    if (isModuleAvailable()) {
      if (Platform.OS === 'android') {
        return InAppReviewModule.showInAppCommentHMS();
      }
    }
  }

  static isAvailable() {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return true;
    } else if (Platform.OS === 'ios') {
      return isIOSReviewAvailable();
    } else {
      return false;
    }
  }
}
