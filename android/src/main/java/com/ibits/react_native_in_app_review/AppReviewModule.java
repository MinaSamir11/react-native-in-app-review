package com.ibits.react_native_in_app_review;

import android.widget.Toast;

import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;

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
        ReviewManager manager = ReviewManagerFactory.create(getReactApplicationContext());
        Task<ReviewInfo> request = manager.requestReviewFlow();

        request.addOnCompleteListener(task -> {
             if (task.isSuccessful()) {
                // We can get the ReviewInfo object
                ReviewInfo reviewInfo = task.getResult();
                Task<Void> flow = manager.launchReviewFlow(getCurrentActivity(), reviewInfo);

                flow.addOnCompleteListener(taski -> {
                    // The flow has finished. The API does not indicate whether the user
                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                    // matter the result, we continue our app flow.
                    Log.e("Review isSuccessful",""+taski.isSuccessful());
                });

            } else {
                Log.e("Review Error",task.getResult().toString());
            }

        });
    }

}
