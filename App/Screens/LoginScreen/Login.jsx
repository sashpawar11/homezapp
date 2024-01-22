import { View, Text , Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();


export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{alignItems:'center'}}>
      <Text style={{fontWeight:700,fontSize:20, color:Colors.PRIMARY}}>HomeZapp</Text>
      <Image source={require('./../../../assets/loginanim.gif')}
      style={styles.loginImage}
      />
      <View style={styles.subContainer}>
          <Text style={{textAlign:'center',fontSize:24,color:Colors.WHITE}}>Find Professional Home Services and Utility on <Text style={{fontWeight:'bold'}}>HomeZapp!</Text></Text>
          <Text style={{fontSize:15,textAlign:'center',marginTop:10,color:Colors.WHITE}}>A one-stop app for all your needs, right at your doorstep.</Text>

          <TouchableOpacity style={styles.button} onPress={()=>onPress()} 
          >
            <Text style={{fontWeight:'bold', textAlign:'center',color:Colors.PRIMARY}}>Let's Get Started</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImage:{
    width: 400,
    height: 350
  },
  subContainer: {

    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding:20,
    paddingTop:80

  },
  button: {
    padding:15,
    backgroundColor:Colors.WHITE,
    borderRadius:99,
    marginTop:50,

  }
})