import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    SafeAreaView
} from 'react-native';
import * as firebase from "firebase";
import styles from './assets/styles';

const firebaseConfig = {
    apiKey: "AIzaSyDA4vg-KrM-nA_tFx5DCGVZVlCp-F6YbN4",
    authDomain: "cross-platform-pkdx.firebaseapp.com",
    databaseURL: "https://cross-platform-pkdx.firebaseio.com",
    projectId: "cross-platform-pkdx",
    storageBucket: "cross-platform-pkdx.appspot.com",
    messagingSenderId: "407208827338",
    appId: "1:407208827338:web:0a4afdef0fdc251e915733",
    measurementId: "G-SWSMLM4ZCP"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: {}
        };
    }

    componentDidMount() {
        this.checkUser();
    }

    checkUser = () => {
        const user = firebase.auth().currentUser;
        if (user) this.goTo('User');
    }

    goTo(page) {
        this.props.navigation.navigate(page);
    }

    signUp() {

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                Alert.alert(JSON.stringify('Sign Up successful !'));
                //console.log(res);
                this.setState({ email: '', password: '' });
            }).catch(error => {
                Alert.alert(error.toString(error));
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.view}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        name="email"
                        autoCapitalize='none'
                        style={{ height: 30, width: 300, borderBottomWidth: 1.0, marginRight: 5 }}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                    >
                        {this.state.email}
                    </TextInput>
                    <TextInput
                        name="password"
                        secureTextEntry={true}
                        style={{ height: 30, width: 300, borderBottomWidth: 1.0, marginRight: 5 }}
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                    >
                        {this.state.password}
                    </TextInput>
                    <TextInput
                        name="password"
                        secureTextEntry={true}
                        style={{ height: 30, width: 300, borderBottomWidth: 1.0, marginRight: 5 }}
                        placeholder="Confirm your password"
                        onChangeText={password => this.setState({ password })}
                    >
                        {this.state.password}
                    </TextInput>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Button
                            style={styles.button}
                            title="Sign In"
                            onPress={() => this.goTo('SignIn')}
                        />
                        <Button
                            style={styles.button}
                            title="Sign Up"
                            onPress={() => this.signUp()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}