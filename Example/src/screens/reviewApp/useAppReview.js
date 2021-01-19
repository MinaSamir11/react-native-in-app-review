import React from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import InAppReview from 'react-native-in-app-review';

export default function useAppReview() {
  const {getItem, setItem} = useAsyncStorage('in_App_Review');

  const onReview = async () => {
    const lastDateAppReviewed = await getItem();

    if (lastDateAppReviewed !== null) {
      let Today = new Date();
      const leftTime = Math.abs(Today - Date.parse(lastDateAppReviewed));
      let leftDays = Math.ceil(leftTime / (1000 * 60 * 60 * 24));

      if (leftDays > 15) {
        await setItem(new Date().toString());
        InAppReview.RequestInAppReview();
      }
    } else {
      await setItem(new Date().toString());
      InAppReview.RequestInAppReview();
    }
  };

  return {
    onReview,
  };
}
