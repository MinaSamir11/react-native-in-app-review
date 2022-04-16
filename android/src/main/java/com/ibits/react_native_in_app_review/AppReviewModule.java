package com.ibits.react_native_in_app_review;

import androidx.annotation.NonNull;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import java.util.Objects;

public class AppReviewModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext mContext;
    private Promise pendingPromise;
    private Promise pendingInAppCommentPromise;

    public AppReviewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        this.mContext.addActivityEventListener(this);
    }


    @Override
    public void onNewIntent(Intent intent) { }

    @NonNull
    @Override
    public String getName() {
        return "InAppReviewModule";
    }

    @ReactMethod
    public void show(final Promise promise) {
        this.pendingPromise = promise;
        if(Build.VERSION.SDK_INT >= 21) {
            if (isGooglePlayServicesAvailable()) {
                Log.e("isGooglePlaySerAvail.", isGooglePlayServicesAvailable() + "");

                ReviewManager manager = ReviewManagerFactory.create(mContext);
                Task<ReviewInfo> request = manager.requestReviewFlow();

                request.addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        // We can get the ReviewInfo object
                        ReviewInfo reviewInfo = task.getResult();
                        Activity currentActivity = getCurrentActivity();

                        if (currentActivity == null) {
                            rejectPromise("24", new Error("ACTIVITY_DOESN'T_EXIST"));
                            return;
                        }

                        Task<Void> flow = manager.launchReviewFlow(currentActivity, reviewInfo);
                        flow.addOnCompleteListener(reviewFlow -> {
                            resolvePromise(reviewFlow.isSuccessful());
                            // The flow has finished. The API does not indicate whether the user
                            // reviewed or not, or even whether the review dialog was shown. Thus, no
                            // matter the result, we continue our app flow.

                        });
                    } else {
                        // There was some problem, continue regardless of the result.
                        rejectPromise("23", new Error(Objects.requireNonNull(task.getException()).getMessage()));
                    }
                });

            } else {
                Log.e("isGooglePlaySerAvail._NOTTTT", isGooglePlayServicesAvailable() + "");

            }
        } else {
            rejectPromise("21", new Error("ERROR_DEVICE_VERSION"));
        }
    }

    @ReactMethod
    public void showInAppCommentHMS (final Promise promise) {
        this.pendingInAppCommentPromise = promise;
        Activity currentActivity = getCurrentActivity();

        Intent intent = new Intent("com.huawei.appmarket.intent.action.guidecomment");
        intent.setPackage("com.huawei.appmarket");
        if (currentActivity != null) {
            currentActivity.startActivityForResult(intent, 1001);
        }else {
            rejectPromiseHMS("24", new Error("ACTIVITY_DOESN'T_EXIST"));
        }

    }

    private void rejectPromise(String code, Error err) {
        if (this.pendingPromise != null) {
            this.pendingPromise.reject(code, err);
            this.pendingPromise = null;
        }
    }

    private void rejectPromiseHMS(String code, Error err) {
        if (this.pendingInAppCommentPromise != null) {
            this.pendingInAppCommentPromise.reject(code, err);
            this.pendingInAppCommentPromise = null;
        }
    }
    
    private void resolvePromise(boolean hasFlowFinishedSuccessfully) {
        if (this.pendingPromise != null) {
            this.pendingPromise.resolve(hasFlowFinishedSuccessfully);
            this.pendingPromise = null;
        }
    }

    private void resolvePromiseHMS(int resultCode) {
        if (this.pendingInAppCommentPromise != null) {
            this.pendingInAppCommentPromise.resolve(resultCode);
        }
    }

    
    private boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability GMS = GoogleApiAvailability.getInstance();
        int isGMS = GMS.isGooglePlayServicesAvailable(mContext);
        return isGMS == ConnectionResult.SUCCESS;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
        if (requestCode == 1001) {
            if (resultCode == 101) {
                // Ensure that your app has been correctly released on AppGallery.
                Log.e("huawei_errorrr1 Ensure that your app has been correctly released on AppGallery", isGooglePlayServicesAvailable() + "");
                rejectPromiseHMS("101", new Error("Ensure that your app has been correctly released on AppGallery"));
            } else if (resultCode == 0){
                Log.e("huawei_errorrr1 in app comment Unknown error.", "Unknown error");
                rejectPromiseHMS("0", new Error("in app comment Unknown error"));
            }
            else if (resultCode == 102){
                Log.e("huawei_errorrr1 rating submitted", "rating done");
                resolvePromiseHMS(102);
            } else if (resultCode == 103){
                Log.e("huawei_errorrr1 Comment submitted", "rating done");
                resolvePromiseHMS(103);
            } else if (resultCode == 104) {
                rejectPromiseHMS("104", new Error("check the HUAWEI ID sign-in status"));
                // Prompt the user to check the HUAWEI ID sign-in status.
                Log.e("huawei_errorrr1 check the HUAWEI ID sign-in status",  "");
            } else if (resultCode == 105) {
                rejectPromiseHMS("105", new Error("The user does not meet the conditions for displaying the comment pop-up"));
                Log.e("huawei_errorrr1 The user does not meet the conditions for displaying the comment pop-up", "");
            } else if (resultCode == 106){
                rejectPromiseHMS("106", new Error("The commenting function is disabled"));
                Log.e(" huawei_errorrr1 The commenting function is disabled", "disabled");
            } else if (resultCode == 107){
                rejectPromiseHMS("107", new Error("The in-app commenting service is not supported. (Apps released in the Chinese mainland do not support this service.)"));
                Log.e("huawei_errorrr1 The in-app commenting service is not supported. (Apps released in the Chinese mainland do not support this service.)", "in-app commenting service is not supported");
            } else if (resultCode == 108){
                rejectPromiseHMS("108", new Error("The user canceled the comment"));
                Log.e("huawei_errorrr1 The user canceled the comment.", "user canceled");
            }
        }
    }
}
