import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Picker,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './firebaseConfig';
import styles from './assets/styles';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      pokemons_ref: [],
      pokemons: [],
      user: {},
      userUid: '',
      fav: [],
      text: '',
      order: ''
    }
  }

  componentDidMount() {
    this.fetchPokemonsList();
  }

  async fetchPokemonsList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=30', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    //console.log(data)
    //this.setState({ pokemons: data.sort((a, b) => a.ndex - b.ndex) });
    this.setState({ pokemons_ref: data.results });
    this.setState({ pokemons: data.results });

    this.setState({ fav: [] });
    this.favSync();
    this.checkUser();
    this.getPokemonsDetails();
  }

  getPokemonsDetails() {
    this.state.pokemons.forEach(pokemon => {
      this.fetchPokemonDetails(pokemon);
    });
  }

  async fetchPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    const id = data.id - 1;

    if (this.state.pokemons_ref[id].url === pokemon.url) {
      this.state.pokemons_ref[id].id = data.id;
      this.state.pokemons_ref[id].image = data.sprites.front_default;
    }
    this.setState(this.state.pokemons_ref[id]);
    this.setState(this.state.pokemons[id] = this.state.pokemons_ref[id]);
  }

  goToPokemonDetailsPage = (pokemon) => {
    this.props.navigation.navigate('Pokemon', { pokemon: pokemon });
  }

  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loading: false, user });
      this.addUserUid();
    });
  }

  addUserUid() {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      const userUid = this.state.user && this.state.user.uid || '';
      this.setState({ userUid });
      this.checkUserData();
    }
  }

  favIt(id) {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      if (this.state.fav.includes(id)) {
        const i = this.state.fav.indexOf(id);
        if (i > -1) {
          this.state.fav.splice(i, 1);
          this.setState(this.state.fav);
          this.writeUserData();
        }
      } else {
        this.state.fav.push(id);
        this.setState(this.state.fav);
        this.writeUserData();
      }
    } else {
      Alert.alert('Vous devez vous connecter pour accéder à cette fonctionnalité...')
    }
  }

  writeUserData() {
    const fav = this.state.fav;
    const userUid = this.state.userUid && this.state.userUid || '';
    firebase.database().ref('Users/' + userUid + '/').set({
      fav
    }).then(() => {
      this.favSync();
    }).catch((error) => {
      Alert.alert('Error : ', error);
    });
  }

  favSync() {
    const vm = this;
    this.state.pokemons.map((pokemon, i) => {
      vm.state.pokemons[i].favIcon = (vm.state.fav.includes(pokemon.id)) ? 'heart' : 'heart-outline';
      vm.setState(vm.state.pokemons[i]);
    });
  }

  checkUserData() {
    const vm = this;
    const userUid = this.state.userUid && this.state.userUid || '';
    firebase.database().ref('Users/' + userUid + '/').once('value', function (snapshot) {
      if (snapshot.exists() && userUid) {
        vm.readUserData(userUid);
      } else {
        console.log(userUid)
        Alert.alert('Error : There is no user dataaa');
      }
    }).catch(() => {
      Alert.alert('Error : ', error);
    });
  }

  readUserData(userUid) {
    const vm = this;
    firebase.database().ref('Users/' + userUid + '/').once('value', function (snapshot) {
      vm.state.fav = snapshot.val().fav;
      vm.setState(vm.state.fav);
      vm.favSync();
    });
  }

  handleSearchChange(text) {
    this.setState({ text });
    this.setState({
      pokemons: this.state.pokemons_ref.filter((pokemon) => {
        return this.ignoreCase(`${pokemon.id}${pokemon.name}`).includes(this.ignoreCase(text));
      })
    });
  }

  handleSelectChange(order) {
    this.setState({ order });

    switch (true) {
      case (order === 'orderById'):
        this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.id - b.id) });
        break;

      case (order === 'disorderById'):
        this.setState({ pokemons: this.state.pokemons.sort((a, b) => b.id - a.id) });
        break;

      case (order === 'orderByName'):
        this.setState({
          pokemons: this.state.pokemons.sort((a, b) => {
            return (this.ignoreCase(a.name) > this.ignoreCase(b.name)) ? 1 : (this.ignoreCase(a.name) < this.ignoreCase(b.name)) ? -1 : 0
          })
        });
        break;

      case (order === 'disorderByName'):
        this.setState({
          pokemons: this.state.pokemons.sort((a, b) => {
            return (this.ignoreCase(b.name) > this.ignoreCase(a.name)) ? 1 : (this.ignoreCase(b.name) < this.ignoreCase(a.name)) ? -1 : 0
          })
        });
        break;

      default:
        this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.id - b.id) });
    }
  }

  ignoreCase(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewSearch}>
          <TextInput
            name="search"
            style={{ height: 30, width: 250, borderBottomWidth: 1.0, marginRight: 5 }}
            placeholder="Search..."
            onChangeText={text => this.handleSearchChange(text)}
          >
            {this.state.text}
          </TextInput>
          <Picker
            selectedValue={this.state.order}
            style={{ height: 50, width: 50 }}
            onValueChange={(order) => this.handleSelectChange(order)}
          >
            <Picker.Item label="Order by Id" value="orderById" />
            <Picker.Item label="Disorder by Id" value="disorderById" />
            <Picker.Item label="Order by Name" value="orderByName" />
            <Picker.Item label="Disorder by Name" value="disorderByName" />
          </Picker>
        </View>
        <View style={styles.viewPokeList}>
          {this.state.pokemons.map((pokemon) =>
            <TouchableOpacity
              key={pokemon.id}
              style={styles.pokeCards}
              onPress={() => this.goToPokemonDetailsPage(pokemon)}
            >
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{pokemon.name}</Text>
                <Text style={{ fontSize: 14 }}>Index : {pokemon.id}</Text>
              </View>
              <View style={styles.viewImg}>
                <Image
                  style={styles.pokeballImg}
                  source={require('./assets/pokeball.png')}
                />
                <Image
                  style={styles.img}
                  source={{ uri: pokemon.image }}
                />
                <Icon
                  name={pokemon.favIcon}
                  size={20}
                  style={{ marginTop: -40, marginRight: -10 }}
                  onPress={() => this.favIt(pokemon.id)}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }
}