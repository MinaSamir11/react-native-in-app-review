declare module 'react-native-in-app-review';

export function RequestInAppReview(): Promise<boolean>;

export function requestInAppCommentAppGallery(): Promise<any>;

export function isAvailable(): boolean;
