declare module 'react-native-in-app-review';

declare const ReactNativeInAppReview: {
  RequestInAppReview(): Promise<boolean>;
  requestInAppCommentAppGallery(): Promise<any>;
  isAvailable(): boolean;
};

export default ReactNativeInAppReview;
