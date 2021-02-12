#import "RNInAppReviewIOS.h"
#import <StoreKit/SKStoreReviewController.h>

@implementation RNInAppReviewIOS


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
  return @{
    @"isAvailable": [SKStoreReviewController class] ? @(YES) : @(NO)
  };
}

RCT_EXPORT_METHOD(requestReview:
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject) {
      if (@available(iOS 10.3, *)) {
        [SKStoreReviewController requestReview];
         resolve(@"true");
      }else{
         reject(@"21",@"ERROR_DEVICE_VERSION",nil);
      }
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
