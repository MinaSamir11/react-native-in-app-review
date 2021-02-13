import {NativeModules, Platform} from 'react-native';

const {InAppReviewModule, RNInAppReviewIOS} = NativeModules;

const isAvailable = !!RNInAppReviewIOS && RNInAppReviewIOS.isAvailable; //ios version check

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
  }
}

export default class InAppReview {
  static RequestInAppReview() {
    if (Platform.OS === 'android' && isModuleAvailable()) {
      return InAppReviewModule.show();
    } else if (Platform.OS === 'ios' && isModuleAvailable()) {
      return RNInAppReviewIOS.requestReview({});
    }
  }

  static isAvailable() {
    if (isModuleAvailable()) {
      if (Platform.OS === 'android' && Platform.Version >= 21) {
        return true;
      } else if (Platform.OS === 'ios') {
        return isAvailable;
      } else {
        return false;
      }
    }
  }
}
