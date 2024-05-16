import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type ErrorCalloutProps = {
  error: Error;
};

export function ErrorCallout({error}: ErrorCalloutProps) {
  return (
    <View style={styles.alert}>
      <Text style={styles.alertText}>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  alertText: {
    color: '#721c24',
    fontSize: 16,
  },
});
