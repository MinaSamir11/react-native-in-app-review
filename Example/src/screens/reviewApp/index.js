import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import useAppReview from './useAppReview';

const ReviewApp = () => {
  const {onReview} = useAppReview();
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.CartExampleTxt}>Cart Page Example</Text>
      <View style={styles.containerBtn}>
        <Pressable
          testID={'RATE-ME'}
          onPress={onReview}
          style={styles.RateMeBtn}>
          <Text style={styles.RateMeTxt}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReviewApp;

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
  CartExampleTxt: {
    fontSize: 16,
    color: '#006E52',
    fontWeight: 'bold',
    margin: 15,
  },
  RateMeBtn: {
    backgroundColor: '#6E0052',
    alignSelf: 'center',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  RateMeTxt: {color: '#fff', fontWeight: 'bold', fontSize: 15},
  containerBtn: {justifyContent: 'center', flex: 1},
});
