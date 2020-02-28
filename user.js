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

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firebase: {},
            user: {},
            loading: true
        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        const { firebase } = params || {};
        const { user } = params || {};

        this.setState({ firebase, user });
        this.checkUser();
    }

    checkUser() {
        this.props.route.params.firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loading: false, user: user || {} });
        });
    }

    goTo(page) {
        this.props.navigation.navigate(page);
    }

    getUser() {
        const user = this.state.firebase.auth().currentUser;
        Alert.alert(user && Object.keys(user).length > 0 ? JSON.stringify(user) : 'Nothing here ! : ' + JSON.stringify(this.state.user))
    }

    signOut = async () => {
        await this.state.firebase.auth().signOut().then(res => {
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