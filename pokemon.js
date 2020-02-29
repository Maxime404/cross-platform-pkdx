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
      pokemon: {},
      types: [],
      abilities: [],
      game_indices: []
    }
  }

  componentDidMount() {
    this.getPokemonId();
  }

  getPokemonId() {
    const { params } = this.props.route;
    const pokemon = params ? params.pokemon : null;

    this.setState({ pokemon: pokemon });

    this.fetchPokemonDetails(pokemon.url)
  }

  async fetchPokemonDetails(url) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();

    this.setState({ pokemon: data });

    this.state.pokemon.image = data.sprites.front_default;
    this.setState(this.state.pokemon);
    this.getInfos();
  }

  getInfos() {
    const pokemon = this.state.pokemon;
    this.setState({ types: pokemon.types });
    this.setState({ abilities: pokemon.abilities });
    this.setState({ game_indices: pokemon.game_indices });
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
            </View>
            <View style={styles.viewList}>
              <Text style={{ fontSize: 20 }}>-- #{this.state.pokemon.id} --</Text>
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
                <View style={{ borderTopWidth: 1.0, borderTopColor: 'grey', paddingTop: 5 }}>
                  <Text style={styles.bold}>{this.state.types.length > 1 ? "Present in the versions : " : "Present in the version : "}</Text>
                  <Text>
                    {this.state.game_indices.map((game_indice) =>
                      <Text style={styles.grey}>{game_indice.version.name}  </Text>
                    )}
                  </Text>
                </View>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}