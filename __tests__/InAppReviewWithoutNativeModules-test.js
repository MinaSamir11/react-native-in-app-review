/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {Platform} from 'react-native';
import InAppReview from '../';

jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => {
  let _NativeModules = {};

  return _NativeModules;
});

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

describe('test-react-native-in-app-review-without-NativeModules-exist', () => {
  it('should throw error in iOS Module if module not exist', async () => {
    Platform.OS = 'ios';

    const errorMessageExpected =
      'InAppReview native module not available, did you forget to link the library?';

    expect(() => {
      InAppReview.RequestInAppReview();
    }).toThrow(errorMessageExpected);
  });

  it('should throw error in android Module if module not exist', async () => {
    Platform.OS = 'android';

    const errorMessageExpected =
      'InAppReview native module not available, did you forget to link the library?';

    expect(() => {
      InAppReview.RequestInAppReview();
    }).toThrow(errorMessageExpected);
  });

  it('should throw error in calling in app comment Module if module not exist', async () => {
    Platform.OS = 'android';

    const errorMessageExpected =
      'InAppReview native module not available, did you forget to link the library?';
    expect(() => {
      InAppReview.requestInAppCommentAppGallery();
    }).toThrow(errorMessageExpected);
  });
});
