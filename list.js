import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import styles from './assets/styles';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      pokemons: []
    }
  }

  componentDidMount() {
    this.fetchPokemonsList();
  }

  async fetchPokemonsList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    //console.log(data)
    //this.setState({ pokemons: data.sort((a, b) => a.ndex - b.ndex) });
    this.setState({ pokemons: data.results });

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

    if (this.state.pokemons[id].url === pokemon.url) {
      this.state.pokemons[id].id = data.id;
      this.state.pokemons[id].image = data.sprites.front_default;
    }
    
    this.setState(this.state.pokemons[id]);
  }

  goToPokemonDetailsPage = (pokemon) => {
    this.props.navigation.navigate('Pokemon', { pokemon: pokemon });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewList}>
          {this.state.pokemons.map((pokemon) =>

            <TouchableOpacity
              style={styles.viewListBordered}
              onPress={() => this.goToPokemonDetailsPage(pokemon)}
            >
              <Image
                style={styles.img}
                source={{ uri: pokemon.image }}
              />
              <Text style={{ paddingHorizontal: 5 }}>{pokemon.name}</Text>
              <Text style={{ paddingHorizontal: 5 }}>{pokemon.id}</Text>
            </TouchableOpacity>


          )}
        </View>
      </ScrollView>
    );
  }
}