import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    SafeAreaView
} from 'react-native';
import styles from './assets/styles';
import firebase from './firebaseConfig';

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: {},
            loading: true
        };
    }

    componentDidMount() {
        this.checkUser();
    }

    checkUser() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loading: false, user });
            if (user && Object.keys(user).length > 0) {
                this.goTo('User', { user: user });
            }
        });
    }

    goTo(page, params = {}) {
        params = { firebase: firebase };
        this.props.navigation.navigate(page, params);
    }

    signIn() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                //console.log(res);
                Alert.alert(JSON.stringify('Sign In successful !'));
                this.setState({ email: '', password: '' });
                this.checkUser();
            })
            .catch(error => {
                Alert.alert(error.toString(error));
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.view}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        caretHidden
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
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Button
                            style={styles.button}
                            title="Sign In"
                            onPress={() => this.signIn()}
                        />
                        <Button
                            style={styles.button}
                            title="Sign Up"
                            onPress={() => this.goTo('SignUp')}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}