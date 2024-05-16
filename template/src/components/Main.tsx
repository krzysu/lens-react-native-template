import {useSession, SessionType} from '@lens-protocol/react-native';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

import {ErrorCallout} from './ErrorCallout';
import {LoginForm} from './LoginForm';
import {MyProfile} from './MyProfile';

export function Main() {
  const {address} = useWalletConnectModal();
  const {data: session, error, loading} = useSession();

  if (loading) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  if (error) {
    return <ErrorCallout error={error} />;
  }

  if (!address) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.heading}>Welcome to Lens</Text>
        <Text style={styles.centeredText}>Connect your wallet to begin.</Text>
      </View>
    );
  }

  if (session.authenticated === false) {
    return <LoginForm address={address} />;
  }

  if (session.type === SessionType.JustWallet) {
    return (
      <View style={styles.centeredView}>
        <Text>
          Welcome <Text style={styles.truncatedText}>{session.address}</Text>,
          you need a Profile to use this app.
        </Text>
      </View>
    );
  }

  return <MyProfile profile={session.profile} />;
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 20,
  },
  centeredView: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  centeredText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  truncatedText: {
    fontSize: 16,
  },
});
