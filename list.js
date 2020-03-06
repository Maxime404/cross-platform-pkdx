import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalSelector from 'react-native-modal-selector';
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
      textInputValue: '',
      favFilterIcon: 'heart-outline',
      orderData: [
        { key: 1, section: true, label: 'Order by Id' },
        { key: 2, section: false, label: 'Disorder by Id' },
        { key: 3, section: false, label: 'Order by Name' },
        { key: 4, section: false, label: 'Disorder by Name' }
      ],
      orderValue: ''
    }
  }

  componentDidMount() {
    this.setState({ fav: [] });
    this.checkUser();
  }

  async fetchPokemonsList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=26', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    //console.log(data)
    //this.setState({ pokemons: data.sort((a, b) => a.ndex - b.ndex) });
    this.setState({ pokemons_ref: data.results });
    this.setState({ pokemons: data.results });
    this.favSync();
    this.getPokemonsDetails();
  }

  getPokemonsDetails() {
    const lenght = this.state.pokemons.length - 1;
    this.state.pokemons.forEach((pokemon, i) => {
      this.fetchPokemonDetails(pokemon, lenght, i);
    });
  }

  async fetchPokemonDetails(pokemon, lenght, i) {
    const response = await fetch(pokemon.url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    const id = data.id - 1;
    const pokemons_ref = this.state.pokemons_ref;
    const vm = this;

    if (this.state.pokemons_ref[id].url === pokemon.url) {
      pokemons_ref[id].id = data.id;
      pokemons_ref[id].image = data.sprites.front_default;
    }
    this.setState({ pokemons_ref });
    this.setState({ pokemons: pokemons_ref });
    setTimeout(() => {
      if (lenght === i && this.state.userUid) vm.writeUserPokemonsData();
    }, 1);
  }

  goToPokemonDetailsPage(pokemon) {
    this.props.navigation.navigate('Pokemon', { pokemon: pokemon });
  }

  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loading: false, user });
      this.getUserUid();
    });
  }

  getUserUid() {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      const userUid = this.state.user && this.state.user.uid || '';
      this.setState({ userUid });
      this.checkUserData();
    } else {
      this.fetchPokemonsList();
    }
  }

  favIt(id) {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      if (this.state.fav.includes(id)) {
        const i = this.state.fav.indexOf(id);
        if (i > -1) {
          this.state.fav.splice(i, 1);
          this.setState(this.state.fav);
          this.favSync();
          this.writeUserFavData();
        }
      } else {
        this.state.fav.push(id);
        this.setState(this.state.fav);
        this.favSync();
        this.writeUserFavData();
      }
    } else {
      Alert.alert('You need to be logged in to access this feature...');
    }
  }

  writeUserFavData() {
    const fav = this.state.fav;
    const userUid = this.state.userUid && this.state.userUid || '';
    firebase.database().ref('Users/' + userUid + '/').update({
      fav
    }).catch((error) => {
      Alert.alert('Error : ', error);
    });
  }

  writeUserPokemonsData() {
    const pokemons = this.state.pokemons_ref;
    const userUid = this.state.userUid && this.state.userUid || '';
    firebase.database().ref('Users/' + userUid + '/').update({
      pokemons
    }).then(() => {
      this.favSync();
    }).catch((error) => {
      Alert.alert('Error : ', error);
    });
  }

  favSync() {
    const vm = this;
    this.state.pokemons_ref.map((pokemon, i) => {
      vm.state.pokemons_ref[i].favIcon = (vm.state.fav.includes(pokemon.id)) ? 'heart' : 'heart-outline';
      vm.setState(vm.state.pokemons_ref[i]);
      vm.setState(vm.state.pokemons[i] = vm.state.pokemons_ref[i]);
    });
  }

  checkUserData() {
    const vm = this;
    const userUid = this.state.userUid && this.state.userUid || '';
    firebase.database().ref('Users/' + userUid + '/fav').once('value', function (snapshot) {
      if (snapshot.exists() && userUid) {
        vm.readUserFavData(userUid);
      }
    }).catch(() => {
      Alert.alert('Error : ', error);
    });

    firebase.database().ref('Users/' + userUid + '/pokemons').once('value', function (snapshot) {
      if (snapshot.exists() && userUid) {
        vm.readUserPokemonsData(userUid);
      } else {
        vm.fetchPokemonsList();
      }
    }).then(() => {
      vm.favSync();
    }).catch(() => {
      Alert.alert('Error : ', error);
    });
  }

  readUserFavData(userUid) {
    const vm = this;
    firebase.database().ref('Users/' + userUid + '/fav').once('value', function (snapshot) {
      vm.state.fav = snapshot.val();
      vm.setState(vm.state.fav);
    });
  }

  readUserPokemonsData(userUid) {
    const vm = this;
    firebase.database().ref('Users/' + userUid + '/pokemons').once('value', function (snapshot) {
      vm.setState({ pokemons_ref: snapshot.val() });
      vm.setState({ pokemons: snapshot.val() });
      vm.favSync();
    });
  }

  handleSearchChange(textInputValue) {
    this.setState({ textInputValue });
    this.setState({
      pokemons: this.state.pokemons_ref.filter((pokemon) => {
        return this.ignoreCase(`${pokemon.id}${pokemon.name}`).includes(this.ignoreCase(textInputValue));
      })
    });
  }

  handleSelectChange(orderValue) {
    this.setState(prevState => ({
      orderData: prevState.orderData.map(
        data => data.label === orderValue
          ? { ...data, section: true }
          : { ...data, section: false }
      )
    }));

    this.setState({ orderValue });

    switch (true) {
      case (orderValue === 'Order by Id'):
        this.setState({ pokemons: this.state.pokemons.sort((a, b) => a.id - b.id) });
        break;

      case (orderValue === 'Disorder by Id'):
        this.setState({ pokemons: this.state.pokemons.sort((a, b) => b.id - a.id) });
        break;

      case (orderValue === 'Order by Name'):
        this.setState({
          pokemons: this.state.pokemons.sort((a, b) => {
            return (this.ignoreCase(a.name) > this.ignoreCase(b.name)) ? 1 : (this.ignoreCase(a.name) < this.ignoreCase(b.name)) ? -1 : 0
          })
        });
        break;

      case (orderValue === 'Disorder by Names'):
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

  favFilter() {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      if (this.state.favFilterIcon === 'heart-outline') {
        this.setState({ favFilterIcon: 'heart' });
        this.setState({
          pokemons: this.state.pokemons_ref.filter((pokemon) => {
            return pokemon.favIcon === "heart"
          })
        });
      } else {
        this.setState({ favFilterIcon: 'heart-outline' });
        this.setState(this.state.pokemons = this.state.pokemons_ref);
      }
    } else {
      Alert.alert('You need to be logged in to access this feature...');
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewSearch}>
          <TextInput
            name="search"
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#FFF"
            onChangeText={textInputValue => this.handleSearchChange(textInputValue)}
          >
            {this.state.textInputValue}
          </TextInput>
          <ModalSelector
            data={this.state.orderData}
            onChange={(option) => { this.handleSelectChange(option.label) }}>
            <Icon
              style={styles.icon}
              name='arrow-down-drop-circle'
              size={20}
              onPress={() => this.favFilter()}
            />
          </ModalSelector>

          <Icon
            style={styles.icon}
            name={this.state.favFilterIcon}
            size={20}
            onPress={() => this.favFilter()}
          />
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
                <Text style={{ fontSize: 14 }}>#{pokemon.id}</Text>
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
      </ScrollView >
    );
  }
}