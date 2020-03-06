import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './assets/styles';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      firebase: {},
      pokemon: {},
      user: {},
      userUid: '',
      favIcon: 'heart-outline',
      fav: [],
      types: [],
      abilities: [],
      stats: [],
      game_indices: []
    }
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    const { params } = this.props.route;
    const { firebase, pokemon } = params || {};

    this.setState({ firebase, pokemon }, () => {
      this.setState({ favIcon: pokemon.favIcon })
      this.checkUser();
    });

    this.fetchPokemonDetails(pokemon.url);
  }

  checkUser() {
    this.state.firebase.auth().onAuthStateChanged((user) => {
      this.setState(
        {
          user: user || {},
          userUid: user.uid || ''
        }
      );
    });
  }

  async fetchPokemonDetails(url) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    data.image = data.sprites.front_default;

    this.setState({ pokemon: data }, () => {
      this.getInfos();
    });
  }


  getInfos() {
    const pokemon = this.state.pokemon;
    this.setState({ types: pokemon.types });
    this.setState({ abilities: pokemon.abilities });
    this.setState({ stats: pokemon.stats });
    this.setState({ game_indices: pokemon.game_indices });
  }

  favIt(id) {
    if (this.state.user && Object.keys(this.state.user).length > 0) {
      this.readUserFavData();
      if (this.state.fav.includes(id)) {
        const i = this.state.fav.indexOf(id);
        if (i > -1) {
          this.setState(
            {
              fav: [...this.state.fav = this.state.fav.splice(i, 1)],
              favIcon: 'heart-outline'
            }
          );
          this.writeUserFavData();
        }
      } else {
        this.setState(
          {
            fav: [...this.state.fav = this.state.fav.push(id)],
            favIcon: 'heart'
          }
        );
        this.writeUserFavData();
      }
    } else {
      Alert.alert('You need to be logged in to access this feature...');
    }
  }

  readUserFavData() {
    const vm = this;
    this.state.firebase.database().ref('Users/' + this.state.userUid + '/fav').once('value', function (snapshot) {
      vm.setState({fav: [snapshot.val()]});
    });
  }

  writeUserFavData() {
    const fav = this.state.fav;
    const userUid = this.state.userUid && this.state.userUid || '';
    this.state.firebase.database().ref('Users/' + userUid + '/').update({
      fav
    }).catch((error) => {
      Alert.alert('Error : ', error);
    });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.pokeballImgBg}
          source={require('./assets/pokeball.png')}
        />
        <View style={styles.viewList}>
          <View style={styles.pokeCard}>
            <View style={styles.viewPokeImg}>
              <Image
                style={styles.pokeImg}
                source={{ uri: this.state.pokemon.image }}
              />
              <Icon
                style={styles.pokeFav}
                name={this.state.favIcon}
                size={20}
                onPress={() => this.favIt(this.state.pokemon.id)}
              />
            </View>
            <View style={styles.viewList}>
              <Text style={styles.h3}>-- #{this.state.pokemon.id} --</Text>
              <View style={{ flex: 1, width: '95%' }}>
                <View style={styles.viewValue}>
                  <Text style={styles.bold}>Weight :  </Text>
                  <Text style={styles.grey}>{this.state.pokemon.weight} Lbs</Text>
                </View>
                <View style={styles.viewValue}>
                  <Text style={styles.bold}>{this.state.types.length > 1 ? "Types :  " : "Type :  "}</Text>
                  {this.state.types.map((type) =>
                    <Text style={styles.grey}>{type.type.name}  </Text>
                  )}
                </View>
                <View style={styles.viewValue}>
                  <Text style={styles.bold}>{this.state.types.length > 1 ? "Abilities :  " : "Ability :  "}</Text>
                  {this.state.abilities.map((ability) =>
                    <Text style={styles.grey}>{ability.ability.name}  </Text>
                  )}
                </View>
                <View style={{ paddingBottom: 10 }}>
                  <Text style={styles.bold}>{this.state.stats.length > 1 ? "Base stats" : "Base stat"}</Text>
                  {this.state.stats.map((stat) =>
                    <View style={{ flexDirection: 'row', width: 160, alignItems: "center" }}>
                      <View style={{ flexDirection: 'row-reverse', width: 160, alignItems: "center" }}>
                        <Text style={styles.grey}>{stat.base_stat}  </Text>
                        <Text style={{ fontWeight: 'bold' }}>{stat.stat.name} : </Text>
                      </View>
                      <View style={{ backgroundColor: '#C20000', height: 5, width: stat.base_stat * 1.5, borderRadius: 5 }} />
                    </View>
                  )}
                </View>
                <View style={{ borderTopWidth: 1.0, borderTopColor: 'grey', paddingTop: 5 }}>
                  <Text style={styles.bold}>{this.state.types.length > 1 ? "Present in the versions" : "Present in the version"}</Text>
                  <Text>
                    {this.state.game_indices.map((game_indice) =>
                      <Text style={styles.grey}>{game_indice.version.name}  </Text>
                    )}
                  </Text>
                </View>
              </View>
              <Image
                style={styles.pokeballEnd}
                source={require('./assets/pokeball.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}