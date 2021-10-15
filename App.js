import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import LinearGradient from "react-native-linear-gradient";

class App extends Component {

  state = {
    gridSize: 0,
    shuffledTile: [],
    isShown: [],
    count: 0,
    prevNumber: -1,
    prevIndex: -1,
    totalScore: 0,
    frizzed: false
  }

  tilePercentage = 100


  gridButton = (size) => {
    this.setState({
      gridSize: size,
      shuffledTile: this.duplicateTile(size).sort(() => Math.random() - 0.5),
      isShown: Array(size * size).fill(false)
    })
  }

  duplicateTile = (size) => {
    const arr = []
    for (let i = 1; i <= (size * size) / 2; i++) {
      arr[i - 1] = i
    }
    return arr.reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    }, []);
  };

  handleClick = (index) => {
    this.setState({ totalScore: this.state.totalScore + 1 })
    const newIsShown = this.state.isShown.slice()
    if (this.state.count == 0 && newIsShown[index] == false) {
      newIsShown[index] = !newIsShown[index]
      this.setState({
        isShown: newIsShown
      })
      this.setState({
        count: this.state.count + 1,
        prevIndex: index,
        prevNumber: this.state.shuffledTile[index]
      })
    } else if (this.state.count == 1 && newIsShown[index] == false) {
      newIsShown[index] = !newIsShown[index]
      this.setState({
        isShown: newIsShown
      })
      this.setState({
        count: 0,
        frizzed: true
      })
      if (this.state.prevNumber != this.state.shuffledTile[index]) {
        const hideShown = this.state.isShown.slice()
        hideShown[index] = false
        hideShown[this.state.prevIndex] = false
        setTimeout(() => {
          this.setState({
            isShown: hideShown,
            prevIndex: -1,
            prevNumber: -1,
            frizzed: false
          })
        }, 2000)
      }else {
        this.setState({
          frizzed: false
        })
      }
    }
  }

  checker = (arr) => {
    if (arr.length == 0)
      return false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == false)
        return false
    }
    return true
  }

  resetGame = () => {
    alert("Game finished and Your Score is " + this.state.totalScore)
    setTimeout(() => {
      this.setState({
        gridSize: 0,
        shuffledTile: [],
        isShown: [],
        count: 0,
        prevNumber: -1,
        prevIndex: -1,
        totalScore: 0
      })
    }, 2000)

  }

  tileStyle = () => {
    return {
      width: 50,
      height: 60,
      backgroundColor: '#B5E7A7',
      borderColor: 'black',
      borderWidth: 1,
      flexBasis: 90 / this.state.gridSize + '%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      borderRadius: 5
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => this.gridButton(2)}>
            {/* <LinearGradient
              colors={["#004d4d", "#009688"]}
              style={styles.appButtonContainer}
            > */}
              <Text style={{color: 'black'}, styles.appButtonContainer}>2 * 2 Grid</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gridButton(4)} >
            {/* <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            > */}
              <Text style={{color: 'black' }, styles.appButtonContainer}>4 * 4 Grid</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gridButton(6)} >
            {/* <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            > */}
              <Text style={{color: 'black'}, styles.appButtonContainer}>6 * 6 Grid</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.gridButton(8)} >
            {/* <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            > */}
              <Text style={{color: 'black'}, styles.appButtonContainer}>8 * 8 Grid</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.grid}>
          {
            this.state.shuffledTile.map((tile, index) =>
              <TouchableOpacity
                key={index}
                style={this.tileStyle()}
                onPress={() => this.handleClick(index)}
                disabled={this.state.frizzed}
              >
                {this.state.isShown[index] && <Text style={styles.tileNumber}>{tile}</Text>}
              </TouchableOpacity>
            )
          }
        </View>
        <View>
          {
            this.checker(this.state.isShown) && this.resetGame()
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#E6F7E1",
    justifyContent: "flex-start"
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  tileNumber: {
    fontSize:30, 
    fontWeight: '900',
    color: 'green'
  }
});

export default App