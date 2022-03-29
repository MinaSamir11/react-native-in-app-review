#import <Foundation/Foundation.h>
#import <StoreKit/SKStoreReviewController.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNInAppReviewIOS, NSObject)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXTERN_METHOD(requestReview:
          (RCTPromiseResolveBlock)resolve
          rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end