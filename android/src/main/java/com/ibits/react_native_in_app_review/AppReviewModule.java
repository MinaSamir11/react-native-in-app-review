package com.ibits.react_native_in_app_review;

import androidx.annotation.NonNull;
import android.util.Log;

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

public class AppReviewModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    private Promise pendingPromise;

    public AppReviewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "InAppReviewModule";
    }

    @ReactMethod
    public void show(final Promise promise) {
        this.pendingPromise = promise;

        if(isGooglePlayServicesAvailable()) {
            ReviewManager manager = ReviewManagerFactory.create(mContext);
            Task<ReviewInfo> request = manager.requestReviewFlow();
            Log.e("isGooglePlaySerAvail.",isGooglePlayServicesAvailable()+"");

            request.addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    // We can get the ReviewInfo object
                    ReviewInfo reviewInfo = task.getResult();
                    Task<Void> flow = manager.launchReviewFlow(Objects.requireNonNull(getCurrentActivity()), reviewInfo);
                    flow.addOnCompleteListener(reviewFlow -> {
                            // The flow has finished. The API does not indicate whether the user
                            // reviewed or not, or even whether the review dialog was shown. Thus, no
                            // matter the result, we continue our app flow.
                        if(reviewFlow.isSuccessful()) {
                            resolvePromise(reviewFlow.isSuccessful());
                        }else{
                            resolvePromise(false);
                        }
                    });
                } else {
                    // There was some problem, continue regardless of the result.
                    rejectPromise("FAILED_REQUEST_REVIEW_FLOW",new Error(Objects.requireNonNull(task.getException()).getMessage()));
                }
            });
        }else{
            Log.e("isGooglePlaySerAvail.",isGooglePlayServicesAvailable()+"");
            rejectPromise("ERROR_GOOGLE_SERVICES",new Error("GOOGLE_SERVICES_NOT_AVAILABLE"));
        }
    }

    private void rejectPromise(String code, Error err) {
        if (this.pendingPromise != null) {
            this.pendingPromise.reject(code, err);
            this.pendingPromise = null;
        }
    }

    private void resolvePromise(boolean hasFlowFinishedSuccessfully) {
        if (this.pendingPromise != null) {
            this.pendingPromise.resolve(hasFlowFinishedSuccessfully);
            this.pendingPromise = null;
        }
    }

    private boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability GMS = GoogleApiAvailability.getInstance();
        int isGMS = GMS.isGooglePlayServicesAvailable(mContext);
        return isGMS == ConnectionResult.SUCCESS;
    }
}
