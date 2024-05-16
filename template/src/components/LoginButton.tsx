import {Profile, useLogin} from '@lens-protocol/react-native';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export type LoginButtonProps = {
  address: string;
  profile: Profile;
};

export function LoginButton({address, profile}: LoginButtonProps) {
  const {execute: login, loading: loginLoading} = useLogin();

  const onLoginPress = async () => {
    const result = await login({
      address,
      profileId: profile?.id,
    });

    if (result.isFailure()) {
      console.error('Log-in error:', result.error.message);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, loginLoading && styles.buttonDisabled]}
      onPress={onLoginPress}
      disabled={loginLoading}>
      {loginLoading ? (
        <ActivityIndicator color="#007bff" />
      ) : (
        <Text style={styles.buttonText} numberOfLines={1}>
          {profile.handle?.fullHandle ?? profile.ownedBy.address}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'transparent', // Assuming a link style
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#007bff', // Assuming primary action color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
