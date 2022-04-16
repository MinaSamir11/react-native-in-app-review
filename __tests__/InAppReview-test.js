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

jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => {
  let _NativeModules = {};

  _NativeModules = {
    InAppReviewModule: {show: jest.fn(), showInAppCommentHMS: jest.fn()},
    RNInAppReviewIOS: {requestReview: jest.fn(), isAvailable: jest.fn()},
  };

  return _NativeModules;
});

describe('test-react-native-in-app-review-when-NativeModules-exist', () => {
  it('should Not Call any Native method when paltform is not ios or android', async () => {
    Platform.OS = 'windows';

    await InAppReview.RequestInAppReview();

    expect(
      NativeModules.RNInAppReviewIOS.requestReview.mock.calls,
    ).toHaveLength(0);

    expect(NativeModules.InAppReviewModule.show.mock.calls).toHaveLength(0);
  });

  it('should lanuch in App review in android if native module exist and android api >= 21', async () => {
    Platform.OS = 'android';
    Platform.Version = 21;

    await InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.calls).toHaveLength(1);
  });

  it('should lanuch in App comment in android if native module exist', async () => {
    Platform.OS = 'android';
    Platform.Version = 21;

    await InAppReview.requestInAppCommentAppGallery();

    expect(
      NativeModules.InAppReviewModule.showInAppCommentHMS.mock.calls,
    ).toHaveLength(1);
  });

  it('should show Review Dialog in iOS if native module exist', async () => {
    Platform.OS = 'ios';

    await InAppReview.RequestInAppReview();

    expect(
      NativeModules.RNInAppReviewIOS.requestReview.mock.calls,
    ).toHaveLength(1);
  });

  it('should return and throw error (ERROR_DEVICE_VERSION) if android api < 21', async () => {
    Platform.OS = 'android';
    Platform.Version = 19;

    const rejectDeviceVersion = () => {
      throw new Error('ERROR_DEVICE_VERSION');
    };

    jest
      .spyOn(NativeModules.InAppReviewModule, 'show')
      .mockReturnValueOnce(rejectDeviceVersion);

    await InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.results[0].value).toThrow(
      'ERROR_DEVICE_VERSION',
    );
  });

  it('should return and throw error in iOS Platform (ERROR_DEVICE_VERSION) if iOS < 10.3', async () => {
    Platform.OS = 'ios';

    const rejectDeviceVersion = () => {
      throw new Error('ERROR_DEVICE_VERSION');
    };

    jest
      .spyOn(NativeModules.RNInAppReviewIOS, 'requestReview')
      .mockReturnValueOnce(rejectDeviceVersion);

    await InAppReview.RequestInAppReview();

    expect(
      NativeModules.RNInAppReviewIOS.requestReview.mock.results[0].value,
    ).toThrow('ERROR_DEVICE_VERSION');
  });

  it('should return and throw error (GOOGLE_SERVICES_NOT_AVAILABLE) if android device does not support GOOGLE_SERVICES', async () => {
    Platform.OS = 'android';

    const rejectGooglePlaySevices = () => {
      throw new Error('GOOGLE_SERVICES_NOT_AVAILABLE');
    };

    jest
      .spyOn(NativeModules.InAppReviewModule, 'show')
      .mockReturnValueOnce(rejectGooglePlaySevices);

    await InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.results[0].value).toThrow(
      'GOOGLE_SERVICES_NOT_AVAILABLE',
    );
  });
  it('should return and throw error With error code "23" in android env this refer that unexpected error happen', async () => {
    Platform.OS = 'android';

    const rejectGooglePlaySevices = () => {
      throw new Error('23');
    };

    jest
      .spyOn(NativeModules.InAppReviewModule, 'show')
      .mockReturnValueOnce(rejectGooglePlaySevices);

    await InAppReview.RequestInAppReview();

    expect(NativeModules.InAppReviewModule.show.mock.results[0].value).toThrow(
      '23',
    );
  });

  it('should return true in android envirmoment when review flow finished', async () => {
    Platform.OS = 'android';

    jest
      .spyOn(NativeModules.InAppReviewModule, 'show')
      .mockResolvedValueOnce('true');

    await InAppReview.RequestInAppReview();

    expect(
      NativeModules.InAppReviewModule.show.mock.results[0].value,
    ).resolves.toEqual('true');
  });

  it('should return true in iOS Platform when review lanuch successuffly', async () => {
    Platform.OS = 'ios';

    jest
      .spyOn(NativeModules.RNInAppReviewIOS, 'requestReview')
      .mockResolvedValueOnce('true');

    await InAppReview.RequestInAppReview();

    expect(
      NativeModules.RNInAppReviewIOS.requestReview.mock.results[0].value,
    ).resolves.toEqual('true');
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
