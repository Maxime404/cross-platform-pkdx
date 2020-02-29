import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  view: {
    flex: 1,
    //backgroundColor: "#676767",
    justifyContent: "center",
    alignItems: "center"
  },
  viewTop: {
    flex: 1,
    //backgroundColor: "#DCDCDC",
    alignItems: "center"
  },
  viewBlockPink: {
    backgroundColor: "#F9429E",
    margin: 5,
    width: 200,
    height: 100
  },
  viewBlockRed: {
    backgroundColor: "red",
    margin: 5,
    width: 100,
    height: 100
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    height: 40
  },
  viewList: {
    flex: 1,
    alignItems: "center"
  },
  viewPokeList: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10
  },
  pokeCards: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '90%',
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: '#EEE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65
  },
  pokeCard: {
    paddingHorizontal: 10,
    marginTop: 100,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#EEE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65
  },
  viewImg: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 10
  },
  viewPokeImg: {
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: -100
  },
  header: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  headerGrey: {
    backgroundColor: "#696969",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40
  },
  footer: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 60,
    paddingBottom: 20,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    fontSize: 60,
    color: "#000"
  },
  h2: {
    fontSize: 40,
    color: "#000"
  },
  text: {
    color: "#FFF"
  },
  button: {
    height: 10
  },
  img: {
    width: 80,
    height: 80
  },
  pokeImg: {
    width: 200,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  pokeballImg: {
    width: 60,
    height: 60,
    right: -40,
    transform: [{ rotate: '-40deg' }],
    opacity: .2
  },
  pokeballImgBg: {
    height: 150,
    width: 150,
    marginLeft: 35,
    marginTop: -10,
    transform: [{ rotate: '-30deg' }],
    opacity: .5,
    position: 'absolute'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#C20000'
  },
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  icon: {
    fontSize: 20,
    color: "#FFF"
  },
  input: {
    height: 40,
    width: 300,
    borderBottomWidth: 1.0,
    marginRight: 5
  }
});