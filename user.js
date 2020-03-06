import React, { Component } from 'react';
import {
    View,
    Text,
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
            user: {},
            loading: true
        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        const { user } = params || {};

        this.setState({ user });
        this.checkUser();
    }

    checkUser() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loading: false, user: user || {} });
            this.checkUserData();
        });
    }

    goTo(page) {
        this.props.navigation.navigate(page);
    }

    getUser() {
        const user = firebase.auth().currentUser;
        Alert.alert(user && Object.keys(user).length > 0
            ? JSON.stringify(user)
            : 'Nothing here ! : ' + JSON.stringify(this.state.user))
    }

    signOut = async () => {
        await firebase.auth().signOut().then(res => {
            Alert.alert(JSON.stringify('Sign Out successful !'));
            this.goTo('SignIn');
        }).catch(error => {
            Alert.alert(error.toString(error));
        });
    }

    checkUserData() {
        const vm = this;
        const userUid = this.state.user.uid;
        firebase.database().ref('Users/' + userUid + '/').once('value', function (snapshot) {
            if (!snapshot.exists() && userUid) {
                vm.writeUserData(userUid);
            }
        });
    }

    writeUserData(userUid) {
        firebase.database().ref('Users/' + userUid + '/').set({
            email: this.state.user.email,
            fav: [0]
        }).catch((error) => {
            console.log('Error : ', error)
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
                            onPress={() => this.signOut()}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Show user"
                            onPress={() => this.getUser()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}