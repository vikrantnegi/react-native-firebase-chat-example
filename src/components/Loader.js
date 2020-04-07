import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const FullLoading = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="rgba(0, 0, 0, 0.85)" />
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default FullLoading;
