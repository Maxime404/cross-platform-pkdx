import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
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

    this.setState({pokemon: pokemon});

    this.fetchPokemonDetails(pokemon.url)
  }

  async fetchPokemonDetails(url) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();

    this.setState({pokemon: data});
  }

  render() {
    return (
      <View style={styles.view}>
        <Text>{JSON.stringify(this.state.pokemon.id)}</Text>
    </View>
    );
  }
}