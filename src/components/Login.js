import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const login = async () => {
        setShowLoading(true);
        try {
            const doLogin = await auth().signInWithEmailAndPassword(email, password);
            setShowLoading(false);
            if (doLogin.user) {
                navigation.navigate('Home');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }
    };

    return (
        <View
        // style={styles.container}
        >
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 28, height: 50 }}>Please Login!</Text>
                </View>
                <View style={styles.subContainer}>

                    <TextInput
                        label="Email"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}


                    />

                </View>


                <View style={styles.subContainer}>

                    <TextInput
                        label="Your Password"
                        mode="outlined"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                       

                    />

                </View>
                <View style={styles.subContainer}>

                    <Button
                        icon="login" 
                        mode="contained"
                        onPress={() => login()}>
                        Login
                        </Button>
                </View>


                <View style={styles.subContainer}>
                    <Button
                        icon="password" 
                        mode="contained"
                        onPress={() => {
                            navigation.navigate('Reset');
                        }}>
                        Forgot Password?
                        </Button>
                </View>


                <View style={styles.subContainer}>

                    <Button
                        icon="register" 
                        mode="contained"
                        onPress={() => {
                            navigation.navigate('Register');
                        }}>
                        Register
                        </Button>

                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        padding: 20
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
        width: 200
    },
})

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerShown: false,
});