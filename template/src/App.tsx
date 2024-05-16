import './shims';

import {LensConfig, LensProvider} from '@lens-protocol/react-native';
import {storage} from '@lens-protocol/react-native/storage/mmkv';
import {
  IProvider,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import React, {useEffect, useRef} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {ConnectButton} from './components/ConnectButton';
import {Main} from './components/Main';
import {WalletConnectModal} from './components/WalletConnectModal';
import {Deferred} from './utils/Deferred';
import {bindings} from './utils/bindings';
import {getLensEnvironment} from './utils/environment';

export function App() {
  const {provider} = useWalletConnectModal();

  const deferred = useRef(new Deferred<IProvider>());

  useEffect(() => {
    if (provider) {
      deferred.current.resolve(provider);
    }
  }, [provider]);

  const lensConfig: LensConfig = {
    bindings: bindings(deferred.current.promise),
    environment: getLensEnvironment(),
    storage: storage(),
    origin: 'https://helloworld.com',
  };

  return (
    <LensProvider config={lensConfig}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Main />
          <ConnectButton />
        </View>
      </SafeAreaView>
      <WalletConnectModal />
    </LensProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 15,
  },
});
