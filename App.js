import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { registerRootComponent } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NETWORK_INTERFACE } from './src/config';
import { configureStore, Root } from './src/navigators/AppNavigator';


StatusBar.setBarStyle('light-content', true);

// Initialization of the Apollo (graphql) client
const client = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache()
})

export default function App() {
  useKeepAwake();
  return (
    <Provider store={configureStore({})}>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </Provider>
  );
}

// AppRegistry.registerComponent('App', () => App);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
