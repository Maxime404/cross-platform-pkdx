import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            firebase: {},
            user: {},
        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        const { firebase, user } = params || {};

        this.setState({ firebase, user });
    }

    goTo = (page) => {
        this.props.navigation.navigate(page);
    }

    getUser = () => {
        Alert.alert(Object.keys(this.state.user).length > 0 ? JSON.stringify(this.state.user) : 'Nothing here ! : ' + JSON.stringify(this.state.user))
    }

    signOut = async () => {
        await firebase.auth().signOut().then(res => {
            Alert.alert(JSON.stringify('Sign Out successful !'));
            this.goTo('SignIn');
        }).catch(error => {
            Alert.alert(error.toString(error));
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.view}>
                    <Text style={styles.title}>Login</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Button
                            style={styles.button}
                            title="Sign Out"
                            onPress={this.signOut}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Show user"
                            onPress={this.getUser}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}