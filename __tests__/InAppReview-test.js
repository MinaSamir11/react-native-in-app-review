/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {NativeModules, Platform} from 'react-native';
import InAppReview from '../';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  let platform = {
    OS: 'ios',
  };

  const select = jest.fn().mockImplementation((obj) => {
    const value = obj[platform.OS];
    return !value ? obj.default : value;
  });

  platform.select = select;

  return platform;
});

describe('react-native-in-app-review', () => {
  it('should show Review Dialog in iOS if native module exist', () => {
    Platform.OS = 'ios';

    InAppReview.RequestInAppReview();

    expect(
      NativeModules.RNInAppReviewIOS.requestReview.mock.calls,
    ).toHaveLength(1);
  });

  it('should lanuch in App review in android if native module exist and android api >= 21', () => {
    Platform.OS = 'android';
    Platform.Version = 21;

    InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.calls).toHaveLength(1);
  });

  it('should not lanuch in App review in android if native module exist and android api < 21', () => {
    Platform.OS = 'android';
    Platform.Version = 19;

    InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.calls).toHaveLength(0);
  });

  it('should return isAvailable true in android if android api >= 21', () => {
    Platform.OS = 'android';
    Platform.Version = 22;

    expect(InAppReview.isAvailable()).toBeTruthy();
  });
  it('should return isAvailable false in android if android api < 21', () => {
    Platform.OS = 'android';
    Platform.Version = 19;
    expect(InAppReview.isAvailable()).toBeFalsy();
  });
  it('should return isAvailable true in iOS if iOS >= 10.3', () => {
    Platform.OS = 'ios';
    expect(InAppReview.isAvailable()).toBeTruthy();
  });
});
