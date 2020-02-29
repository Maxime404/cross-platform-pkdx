## RUN THE PROJECT ##

In the cross-platform-pkdx file
$ npx expo start

## FOR SWITH BETWEEN DAY OR EX ##

DAY
In ./App.js CHANGE THE "NUMBER" IN THIS LINE:
> import Day from './Day[NUMBER]/App'

EX
In ./Day[NUMBER]/App.js CHANGE THE "NUMBER" (for a file) or "NAME" (for a folder) IN THIS LINE:
> import MyApp from './ex[NUMBER]'
or
> import MyApp from './ex[NAME]/App'

## Create your firebaseConfig.js ##

There is no firebaseConfig file in the Github repository.
You need to creat it.

Instruction :
> Create a firebaseConfig.js file.
> Add this code :

## START firebaseConfig.js ##########
import * as firebase from "firebase";
const firebaseConfig = {
    ```
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
    ```
};

// Initialize Firebase
export default (!firebase.apps.length)
    ? firebase.initializeApp(firebaseConfig)
    : firebase;

## END firebaseConfig.js ##########

> Then you must complete the missing information with that of Firebase.
> You can find them on your General Settings project in the Firebase Console.
LINK : https://console.firebase.google.com/project/cross-platform-pkdx/settings/general/

## ###### ENJOY ###### ##


## REACT-NATIVE-VECTOR-ICONS LINK:
> https://oblador.github.io/react-native-vector-icons/
IN 'import Icon from 'react-native-vector-icons/MaterialCommunityIcons', [MaterialCommunityIcons] REFER TO THE LIBRARY,
YOU CAN CHANGE THAT FOR ANOTHER LABRARY.


## ######################## ##
## ## Hello, Pokédex 2.0 ## ##
## ######################## ##

Hi, here are some rules to carry out this story oav;

You MUST create a git repository named cross-platform-pkdx
You MUST create a file called .author with your username followed by a newline.
~/cross-platform-pkdx ❯❯❯ cat -e .author
sacha$
Of course, you can talk about the subject with other developers, peer-learning is the key to be a better developer. Don't hesitate to ask questions or help people on slack.
Don't forget, there is no useless question :-)
You MUST return the project on Saturday February, 29 at 11:42 pm by sending an MP on slack with the link of your github repo + screenshots of your application.


## 🐱 Overview

The purpose of this challenge is simple, create a new pokedex but now... a real mobile one ! You CAN use any ui.x libraries you want [ if interested, you can even create your own ]

## 🐨 Story

Hi, Pokédex?

Well, first just bootstrap a react-native application using expo that list all pokemons availables on [this](https://pokeapi.co/) PokéApi.

Basic pokémon view

We want to view a specific Pokemon detail ; For that you must add a kind of navigation to your application :)

## Trainer

As a trainer I want to choose specific pokemon to my wishlist ; For that you must add 2 things:

User authentication through Firebase
Allow to add or remove pokemon to a Wishlist view (through a touch action on a star button present near the pokemon in both list and details view)

## 🦄 Bonus

I know you love that, well you can in bulk:

Add some animations
Add some localstorage useful features
Add a touch of geolocalisation