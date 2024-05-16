import '@walletconnect/react-native-compat';
import {useLogout} from '@lens-protocol/react-native';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export function ConnectButton() {
  const {open, isConnected, provider} = useWalletConnectModal();
  const {execute: logout} = useLogout();

  const onPress = () => {
    if (isConnected && provider) {
      provider.disconnect();
      logout();
    } else {
      open();
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
