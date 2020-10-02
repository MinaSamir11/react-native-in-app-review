#import "InAppReview.h"
#import <StoreKit/SKStoreReviewController.h>

@implementation InAppReview

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

RCT_EXPORT_METHOD(show)
{
  [SKStoreReviewController show];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
