import Foundation
import UIKit
import StoreKit

@objc(RNInAppReviewIOS)
class RNInAppReviewIOS: NSObject {

  @objc
  func requestReview (_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    if #available(iOS 14.0, *) {
      let activeWindowScene = UIApplication.shared.connectedScenes.filter { scene in
        return scene.activationState == .foregroundActive && scene is UIWindowScene
      }.first

      if let scene = activeWindowScene as? UIWindowScene {
          if #available(iOS 16.0, *) {
              Task {
                  await MainActor.run {
                      AppStore.requestReview(in: scene)
                      resolve("true");
                  }
              }
          } else {
            SKStoreReviewController.requestReview(in: scene)
            resolve("true");
          }
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
