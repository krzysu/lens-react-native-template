import {useProfilesManaged} from '@lens-protocol/react-native';
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ErrorCallout} from './ErrorCallout';
import {LoginButton} from './LoginButton';

export type LoginFormProps = {
  address: string;
};

export function LoginForm({address}: LoginFormProps) {
  const {
    data: profiles,
    error,
    loading,
  } = useProfilesManaged({
    for: address,
  });

  if (loading) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  if (error) {
    return <ErrorCallout error={error} />;
  }

  if (profiles.length === 0) {
    return <Text style={styles.text}>No profiles on this wallet.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Select a profile to log in</Text>
      <View style={styles.buttonContainer}>
        {profiles.map(profile => (
          <LoginButton key={profile.id} address={address} profile={profile} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
