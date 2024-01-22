import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Constants from "expo-constants"
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';


const tokenCache = {

  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_ZnVuLWNyYXlmaXNoLTQuY2xlcmsuYWNjb3VudHMuZGV2JA'
    tokenCache={tokenCache}
    >
    <View style={styles.container}>

    {/* Signin Component */}
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
      </SignedIn>
    {/* Signout Component */}
      <SignedOut>
        <Login/>
      </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:100,
  },
});
