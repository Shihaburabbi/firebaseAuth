import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function Reset({ navigation }) {

    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);


    const reset = async () => {
        setShowLoading(true);
        try {
            await auth().sendPasswordResetEmail(email);
            setShowLoading(false);
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, height: 50 }}>Reset Password!</Text>
                </View>
                <View style={styles.subContainer}>

                    <TextInput
                        label="Your Email"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                    />

                </View>
                <View style={styles.subContainer}>


                    <Button
                        icon="camera" 
                        mode="contained"
                        onPress={() => reset()} >
                        Reset
                        </Button>

                </View>
                <View style={styles.subContainer}>

                    <Button
                        icon="camera" 
                        mode="contained"
                        onPress={() => {
                            navigation.navigate('Login');
                        }} >
                        Back to Login
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

Reset.navigationOptions = ({ navigation }) => ({
    title: 'Reset',
    headerShown: false,
});