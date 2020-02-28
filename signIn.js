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
            user: null
        };
    }

    componentDidMount() {
        console.log('CDM');
        this.checkUser();
    }

    checkUser() {
        let user = {};
        setTimeout(function () {
            user = firebase.auth().currentUser || null;
        }, 1);


        this.setState(this.state.user = user);

        console.log(firebase ? "f-oui" : "f-nope")
        console.log(user ? "u-oui" : "u-nope : " + user)
        console.log(this.state.user ? "su-oui : " + this.state.user : "su-nope")

        if (user) this.goTo('User');
    }

    goTo(page) {
        this.props.navigation.navigate(page);
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

    showUser = () => {
        const user = firebase.auth().currentUser;

        Alert.alert(this.state.user ? JSON.stringify(user) : 'Nothing here ! : ' + user)
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
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Show user"
                            onPress={this.showUser}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Check user"
                            onPress={() => this.checkUser()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}