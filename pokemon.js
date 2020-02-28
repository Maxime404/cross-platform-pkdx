import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
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
      pokemon: {}
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
              <Text>{JSON.stringify(this.state.pokemon.weight)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}