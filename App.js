import React, { Component } from 'react';
import params from './src/params'

import MineField from './src/components/MineField'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines
} from './src/Functions'

import {
  StyleSheet,
  View,
  Text, Alert
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeuuuu')
    }

    if (won) {
      Alert.alert('Venceuuuuu')
    }

    this.setState({ board, lost, won })
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.board}>
          <MineField board={this.state.board} 
          onOpenField={this.onOpenField}/>
        </View>



      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});


