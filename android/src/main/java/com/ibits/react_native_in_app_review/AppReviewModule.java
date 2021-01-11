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

import java.util.List;

public class AppReviewModule extends ReactContextBaseJavaModule {

    public AppReviewModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "InAppReviewModule";
    }
    
    @ReactMethod
    public void show() {
        if (isPlayStoreInstalled(getReactApplicationContext())) {
            ReviewManager manager = ReviewManagerFactory.create(getReactApplicationContext());
            Task<ReviewInfo> request = manager.requestReviewFlow();
            Log.e("isPlayStoreInstalled",isPlayStoreInstalled(getReactApplicationContext())+"");

            request.addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    // We can get the ReviewInfo object
                    ReviewInfo reviewInfo = task.getResult();
                    Task<Void> flow = manager.launchReviewFlow(getCurrentActivity(), reviewInfo);

                    flow.addOnCompleteListener(taski -> {
                        // The flow has finished. The API does not indicate whether the user
                        // reviewed or not, or even whether the review dialog was shown. Thus, no
                        // matter the result, we continue our app flow.
                        Log.e("Review isSuccessful", "" + taski.isSuccessful());
                    });

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
        } else {
            Log.e("isPlayStoreInstalled",isPlayStoreInstalled(getReactApplicationContext())+"");
        }
    }

    public static boolean isPlayStoreInstalled(Context context) {
        boolean result = false;
        String playStorePackageName = "com.android.vending";
        final PackageManager pm = context.getPackageManager();
        List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
        for (ApplicationInfo packageInfo : packages) {
            if (packageInfo.packageName.equals(playStorePackageName)) {
                result = true;
                break;
            }
        }
        return result;
    }
}
