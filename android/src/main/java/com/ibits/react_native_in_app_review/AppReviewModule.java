package com.ibits.react_native_in_app_review;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.GooglePlayServicesUtil;

import java.util.List;

public class AppReviewModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

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
    public void show() {
        if(isGooglePlayServicesAvailable()) {
            ReviewManager manager = ReviewManagerFactory.create(mContext);
            Task<ReviewInfo> request = manager.requestReviewFlow();
            Log.e("isGooglePlayServicesAvailable",isGooglePlayServicesAvailable()+"");

            request.addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    // We can get the ReviewInfo object
                    try {
                        ReviewInfo reviewInfo = task.getResult();
                        Task<Void> flow = manager.launchReviewFlow(getCurrentActivity(), reviewInfo);

                        flow.addOnCompleteListener(taski -> {
                            // The flow has finished. The API does not indicate whether the user
                            // reviewed or not, or even whether the review dialog was shown. Thus, no
                            // matter the result, we continue our app flow.
                            Log.e("Review isSuccessful", "" + taski.isSuccessful());
                        });
                    } catch (Exception e) {
                        Log.e("Review Error", "getResult may have thrown an exception. This is likely an emulated device.");
                    }
                } else {
                    String taskErrorMessage = "";
                    try {
                        taskErrorMessage = task.getResult().toString();
                    } catch (Exception e) {
                        taskErrorMessage = e.getMessage();
                    }
                    Log.e("Review Error", taskErrorMessage);
                }

            });
        }else{
            Log.e("isGooglePlayServicesAvailable",isGooglePlayServicesAvailable()+"");
        }
    }

    public boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability GMS = GoogleApiAvailability.getInstance();
        int isGMS = GMS.isGooglePlayServicesAvailable(mContext);
        return isGMS == ConnectionResult.SUCCESS;
    }
}
