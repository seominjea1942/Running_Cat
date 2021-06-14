import React, {useState, useContext } from 'react';
import { View , TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Google from 'expo-google-app-auth'
import {useHistory} from 'react-router-native'
import axios from 'axios'

// //async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'
//credentials context
import {CredentialsContext} from '../../CredentialsContext'

function SignIn(props) {
    // const [googleSubmitting, setGoogleSubmitting] = useState(false)
    let history = useHistory()
    let {storedCrendentials, setStoredCredentials} = useContext(CredentialsContext)
    
    const handleGoogleSignIn = () => {
        const config = {
            iosClientId: `811690553498-27d3u384dqhr04r0hh4tnrl5brvflmu3.apps.googleusercontent.com`,
            AndroidClientId: `811690553498-imqvntuumk7q2k381dhv2mgcksn8ngr6.apps.googleusercontent.com`,
            scopes: [ 'profile', 'email']
        }

        Google
        .logInAsync(config)
        .then((result)=>{
            const {type, user} = result;
            if(type == 'success'){
                persistentLogin(user)
                history.push('/home')
            } else {
                console.log('Sign in was canceled')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const persistentLogin =(credentials)=>{
        AsyncStorage.setItem('RunningCatCredentials', JSON.stringify(credentials))
        .then(()=>{
            setStoredCredentials(credentials)
            return credentials
        })
        .then((credentials)=>{
            axios.get(`http://localhost:3000/user/${credentials.email}`)
            .then(res=>setStoredCredentials({...credentials, userInfo:res.data[0]}))
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    return (
        <View style={styles.testContainer}>
            <Image
            style={styles.introIllustration}
            source={require('../../assets/sign_in_illustartion.png')}
            />
            <TouchableOpacity onPress={handleGoogleSignIn}>
                <Image
                    style={styles.googleSignInButton}
                    source={require('../../assets/sign_in_with_google.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    introIllustration:{
        resizeMode: 'contain',
        width: 567/2,
        height: 283/2,
        marginBottom: 20
    },
    testContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    googleSignInButton:{
        resizeMode: 'contain',
        width: 648/3,
        height: 168/3,
    }
})
export default SignIn;