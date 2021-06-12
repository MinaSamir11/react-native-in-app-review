import Foundation
import UIKit
import StoreKit

@objc(RNInAppReviewIOS)
class RNInAppReviewIOS: NSObject {

  @objc 
  func requestReview (_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
      if #available(iOS 14.0, *) {
        if let scene = UIApplication.shared.connectedScenes.first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
            SKStoreReviewController.requestReview(in: scene)
            resolve("true");
        } else {
          reject("25","SCENE_DOESN'T_EXIST",nil);
        }
    } else if #available(iOS 10.3, *) {
        SKStoreReviewController.requestReview()
        resolve("true");
    } else {
        reject("21","ERROR_DEVICE_VERSION",nil);
    }
  }

  @objc
  func constantsToExport() -> [String: Any]! {
    return ["isAvailable":  (NSClassFromString("SKStoreReviewController") != nil)  ? (true) : (false)]
  }
}