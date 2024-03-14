/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {RSA} from 'react-native-rsa-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


const iosid = `712321550877-jai9n91b245gfafsvlc5ri4kqlb4tjpm.apps.googleusercontent.com`;
const androidid = `712321550877-565a5vsaoqdu78uvenueohe7mcam79oi.apps.googleusercontent.com`;
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      setCurrentUser(userInfo.user);
      console.log(userInfo,"userinfo")
    } catch (error) {
      // handle getting current user error
    }
  };
    useEffect(() => {
      const checkSignInStatus = async () => {
        const isUserSignedIn = await GoogleSignin.isSignedIn();
        setIsSignedIn(isUserSignedIn);
        console.log(isUserSignedIn, 'isUserSignedIn');
        if (isUserSignedIn) {
          getCurrentUser();
        }
      };
      checkSignInStatus();
    }, []);

  // create instance
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // hello world
  const testing = () => {
  let message = 'my secret message';

  RSA.generateKeys(4096) // set key size
    .then(keys => {
      console.log('4096 private:', keys.private); // the private key
      console.log('4096 public:', keys.public); // the public key
      RSA.encrypt(message, keys.public).then(encodedMessage => {
        console.log(`the encoded message is ${encodedMessage}`);
        RSA.decrypt(encodedMessage, keys.private).then(decryptedMessage => {
          console.log(`The original message was ${decryptedMessage}`);
        });
      });
    });
  }

  const signIn = async () => {
       GoogleSignin.configure({
         androidClientId: androidid,
         iosClientId: iosid,
       });
       GoogleSignin.hasPlayServices()
         .then(hasPlayService => {
           if (hasPlayService) {
             GoogleSignin.signIn()
               .then(userInfo => {
                 console.log(JSON.stringify(userInfo));
               })
               .catch(e => {
                 console.log('ERROR IS: ' + JSON.stringify(e));
               });
           }
         })
         .catch(e => {
           console.log('ERROR IS: ' + JSON.stringify(e));
         });
  };
const signOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title="Test" onPress={() => testing()} />
      <Button title="getCurrentUser" onPress={() => getCurrentUser()} />

      {!isSignedIn ? (
        <Button title="Sign in with Google" onPress={() => signIn()} />
      ) : (
        <Text>Welcome, {currentUser ? currentUser.name : 'User'}</Text>
      )}
      <Button title={'signOut'} onPress={() => signOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
