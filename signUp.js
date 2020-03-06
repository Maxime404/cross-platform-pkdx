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
import * as firebase from "firebase";

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: ''
        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        //const { item } = params || {};
        //this.setState({ item });
    }

    goTo(page, params = {}) {
        this.props.navigation.navigate(page, params);
    }

    signUp() {
        if (this.state.password === this.state.passwordConfirm) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    Alert.alert(JSON.stringify('Sign Up successful !'));
                    //console.log(res);
                    this.setState({ email: '', password: '', passwordConfirm: '' });
                    this.goTo('User');
                }).catch(error => {
                    Alert.alert(error.toString(error));
                });
        } else {
            Alert.alert('Error: Passwords are different');
        }
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
                        name="passwordConfirm"
                        secureTextEntry={true}
                        style={{ height: 30, width: 300, borderBottomWidth: 1.0, marginRight: 5 }}
                        placeholder="Confirm password"
                        onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                    >
                        {this.state.passwordConfirm}
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