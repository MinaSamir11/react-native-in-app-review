declare module 'react-native-in-app-review';

export function RequestInAppReview(): Promise<boolean>;

export function isAvailable(): boolean;
